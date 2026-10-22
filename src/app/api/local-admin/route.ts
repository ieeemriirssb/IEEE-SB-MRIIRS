import { NextRequest, NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import path from "node:path";
import * as ts from "typescript";
import {
  EDITABLE_SECTIONS,
  isEditableSection,
  SITE_DATA_FILE,
  SECTION_LABELS,
} from "@/lib/local-site-editor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type JsonObject = Record<string, unknown>;
type SourceExpression = { __sourceExpression: string };

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * This API is only for a development server bound to loopback.
 * The npm dev script below binds Next.js to 127.0.0.1.
 */
function hasLocalAccess(request: NextRequest, write = false): boolean {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.ENABLE_LOCAL_SITE_EDITOR !== "true"
  ) return false;

  const hostHeader = request.headers.get("host");
  if (!hostHeader) return false;

  let host: string;
  try {
    host = new URL(`http://${hostHeader}`).hostname.replace(/^\[|\]$/g, "");
  } catch {
    return false;
  }
  if (!["localhost", "127.0.0.1", "::1"].includes(host)) return false;

  // Mutations must originate from the same local origin.
  const origin = request.headers.get("origin");
  if (!origin) return !write;

  try {
    const parsed = new URL(origin);
    const originHost = parsed.hostname.replace(/^\[|\]$/g, "");
    return (
      ["http:", "https:"].includes(parsed.protocol) &&
      ["localhost", "127.0.0.1", "::1"].includes(originHost) &&
      parsed.host === hostHeader
    );
  } catch {
    return false;
  }
}

async function readSource() {
  return fs.readFile(SITE_DATA_FILE, "utf8");
}

function parseSource(source: string) {
  return ts.createSourceFile(
    SITE_DATA_FILE,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

function findExport(sourceFile: ts.SourceFile, section: string): ts.VariableDeclaration {
  for (const statement of sourceFile.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === section &&
        declaration.initializer
      ) return declaration;
    }
  }
  throw new Error(`Could not find exported data "${section}" in site.ts.`);
}

function getArray(sourceFile: ts.SourceFile, section: string): ts.ArrayLiteralExpression {
  const declaration = findExport(sourceFile, section);
  if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
    throw new Error(`Export "${section}" must be an array literal.`);
  }
  return declaration.initializer;
}

function propertyKey(name: ts.PropertyName | ts.BindingName): string | null {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return null;
}

function expressionToValue(node: ts.Expression, sourceFile: ts.SourceFile): unknown {
  if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    const n = Number(node.operand.text);
    if (node.operator === ts.SyntaxKind.MinusToken) return -n;
    if (node.operator === ts.SyntaxKind.PlusToken) return n;
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) =>
      ts.isSpreadElement(element)
        ? { __sourceExpression: sourceFile.text.slice(element.getStart(sourceFile), element.end) }
        : expressionToValue(element as ts.Expression, sourceFile),
    );
  }

  if (ts.isObjectLiteralExpression(node)) {
    const result: JsonObject = {};
    for (const property of node.properties) {
      if (ts.isPropertyAssignment(property)) {
        const key = propertyKey(property.name);
        if (key !== null) result[key] = expressionToValue(property.initializer, sourceFile);
      } else {
        result[`[source] ${property.getText(sourceFile)}`] = {
          __sourceExpression: property.getText(sourceFile),
        };
      }
    }
    return result;
  }

  // Preserve expressions such as ETS9.src and portrait("photo-...") as opaque markers.
  return { __sourceExpression: node.getText(sourceFile) } satisfies SourceExpression;
}

function getRecords(source: string, section: string): unknown[] {
  const sourceFile = parseSource(source);
  const array = getArray(sourceFile, section);
  return array.elements.map((element) =>
    expressionToValue(element as ts.Expression, sourceFile),
  );
}

function isPlainJson(value: unknown): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isPlainJson);
  if (typeof value === "object") {
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) return false;
    return Object.entries(value as JsonObject).every(
      ([key, item]) =>
        !["__proto__", "prototype", "constructor"].includes(key) &&
        isPlainJson(item),
    );
  }
  return false;
}

function isJsonObject(value: unknown): value is JsonObject {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null) &&
    isPlainJson(value)
  );
}

function keyOfProperty(property: ts.ObjectLiteralElementLike): string | null {
  if (!("name" in property) || !property.name) return null;
  return propertyKey(property.name as ts.PropertyName);
}

function validateTypeScript(source: string) {
  const file = parseSource(source);
  const parseErrors =
    (file as unknown as { parseDiagnostics?: readonly ts.Diagnostic[] })
      .parseDiagnostics ?? [];
  const transpile = ts.transpileModule(source, {
    fileName: SITE_DATA_FILE,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
  });
  const errors = [
    ...parseErrors,
    ...(transpile.diagnostics ?? []).filter(
      (d) => d.category === ts.DiagnosticCategory.Error,
    ),
  ];
  if (errors.length) {
    const message = ts.flattenDiagnosticMessageText(errors[0].messageText, "\n");
    throw new Error(`Updated site.ts failed TypeScript syntax validation: ${message}`);
  }
}

function applyPatches(source: string, patches: Array<{ start: number; end: number; text: string }>) {
  let output = source;
  for (const patch of patches.sort((a, b) => b.start - a.start)) {
    output = output.slice(0, patch.start) + patch.text + output.slice(patch.end);
  }
  return output;
}

function serialize(value: unknown): string {
  if (!isPlainJson(value)) throw new Error("Only JSON-compatible values can be saved.");
  const result = JSON.stringify(value, null, 2);
  if (result === undefined) throw new Error("Could not serialize this value.");
  return result;
}

function patchRecord(source: string, section: string, index: number, changes: JsonObject) {
  const sourceFile = parseSource(source);
  const array = getArray(sourceFile, section);
  const element = array.elements[index];
  if (!element || !ts.isObjectLiteralExpression(element)) {
    throw new Error("Selected record is not a plain object literal.");
  }

  const patches: Array<{ start: number; end: number; text: string }> = [];
  const missing: Array<[string, unknown]> = [];

  for (const [key, value] of Object.entries(changes)) {
    if (["__proto__", "prototype", "constructor"].includes(key)) {
      throw new Error(`Invalid field name "${key}".`);
    }
    const existing = element.properties.find((property) => keyOfProperty(property) === key);
    const replacement = serialize(value);

    if (existing && ts.isPropertyAssignment(existing)) {
      patches.push({
        start: existing.initializer.getStart(sourceFile),
        end: existing.initializer.end,
        text: replacement,
      });
    } else if (existing) {
      throw new Error(`Field "${key}" is not a standard property assignment.`);
    } else {
      missing.push([key, value]);
    }
  }

  if (missing.length) {
    const closeBrace = element.end - 1;
    const hasProperties = element.properties.length > 0;
    const insertion = missing
      .map(([key, value]) => `  ${JSON.stringify(key)}: ${serialize(value)}`)
      .join(",\n");
    const prefix = hasProperties ? ",\n" : "\n";
    patches.push({
      start: closeBrace,
      end: closeBrace,
      text: `${prefix}${insertion}\n`,
    });
  }

  return applyPatches(source, patches);
}

function appendRecord(source: string, section: string, record: JsonObject) {
  const sourceFile = parseSource(source);
  const array = getArray(sourceFile, section);
  const newRecord = serialize(record);
  const closeBracket = array.end - 1;

  if (array.elements.length === 0) {
    return source.slice(0, closeBracket) + `\n  ${newRecord},\n` + source.slice(closeBracket);
  }

  const last = array.elements[array.elements.length - 1];
  const afterLast = source.slice(last.end, closeBracket);
  const alreadyHasTrailingComma = afterLast.includes(",");
  const prefix = alreadyHasTrailingComma ? "\n" : ",\n";
  return source.slice(0, closeBracket) + `${prefix}  ${newRecord},\n` + source.slice(closeBracket);
}

function deleteRecord(source: string, section: string, index: number) {
  const sourceFile = parseSource(source);
  const array = getArray(sourceFile, section);
  const elements = array.elements;
  const element = elements[index];
  if (!element) throw new Error("Record index was not found.");

  let start: number;
  let end: number;
  if (elements.length === 1) {
    start = element.getStart(sourceFile);
    end = element.end;
  } else if (index < elements.length - 1) {
    start = element.getStart(sourceFile);
    end = elements[index + 1].getStart(sourceFile);
  } else {
    start = elements[index - 1].end;
    end = element.end;
  }

  return source.slice(0, start) + source.slice(end);
}

async function persistSource(updated: string) {
  validateTypeScript(updated);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = path.join(
    path.dirname(SITE_DATA_FILE),
    `${path.basename(SITE_DATA_FILE)}.local-admin-${timestamp}.bak`,
  );
  const temporary = `${SITE_DATA_FILE}.local-admin-tmp`;

  // Keep a recovery copy, write a temporary file, then replace the source.
  await fs.copyFile(SITE_DATA_FILE, backup);
  try {
    await fs.writeFile(temporary, updated, "utf8");
    await fs.rename(temporary, SITE_DATA_FILE);
  } catch (error) {
    await fs.rm(temporary, { force: true }).catch(() => undefined);
    throw error;
  }
  return path.basename(backup);
}

export async function GET(request: NextRequest) {
  if (!hasLocalAccess(request)) return jsonError("Not Found", 404);

  try {
    const source = await readSource();
    const sections: Record<string, unknown[]> = {};
    for (const section of EDITABLE_SECTIONS) sections[section] = getRecords(source, section);
    return NextResponse.json({ sections, labels: SECTION_LABELS });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to read site.ts.", 500);
  }
}

export async function PUT(request: NextRequest) {
  if (!hasLocalAccess(request, true)) return jsonError("Not Found", 404);

  try {
    const body = await request.json();
    const { section, index, changes } = body ?? {};
    if (!isEditableSection(section)) return jsonError("Section is not editable.", 400);
    if (!Number.isInteger(index) || index < 0) return jsonError("Invalid record index.", 400);
    if (!isJsonObject(changes)) return jsonError("Changes must be a JSON object.", 400);

    const original = await readSource();
    const updated = patchRecord(original, section, index, changes);
    const backup = await persistSource(updated);
    return NextResponse.json({ success: true, message: "Record saved locally.", backup });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to save record.", 400);
  }
}

export async function POST(request: NextRequest) {
  if (!hasLocalAccess(request, true)) return jsonError("Not Found", 404);

  try {
    const body = await request.json();
    const { section, record } = body ?? {};
    if (!isEditableSection(section)) return jsonError("Section is not editable.", 400);
    if (!isJsonObject(record)) return jsonError("Record must be a JSON object.", 400);

    const original = await readSource();
    const updated = appendRecord(original, section, record);
    const backup = await persistSource(updated);
    return NextResponse.json({ success: true, message: "Record added locally.", backup });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to add record.", 400);
  }
}

export async function DELETE(request: NextRequest) {
  if (!hasLocalAccess(request, true)) return jsonError("Not Found", 404);

  try {
    const body = await request.json();
    const { section, index } = body ?? {};
    if (!isEditableSection(section)) return jsonError("Section is not editable.", 400);
    if (!Number.isInteger(index) || index < 0) return jsonError("Invalid record index.", 400);

    const original = await readSource();
    const updated = deleteRecord(original, section, index);
    const backup = await persistSource(updated);
    return NextResponse.json({ success: true, message: "Record deleted locally.", backup });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to delete record.", 400);
  }
}
