import { notFound } from "next/navigation";
import LocalAdminStudio from "./components/AdminStudio";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  // In production, or whenever local editing is not explicitly enabled,
  // return 404 Not Found so the admin dashboard is completely inaccessible.
  if (
    process.env.NODE_ENV === "production" ||
    process.env.ENABLE_LOCAL_SITE_EDITOR !== "true"
  ) {
    notFound();
  }

  return <LocalAdminStudio />;
}
