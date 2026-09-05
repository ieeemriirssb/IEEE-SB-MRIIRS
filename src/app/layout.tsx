import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "../styles.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/QueryProvider";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { GoToTop } from "@/components/common/GoToTop";
import TargetCursor from "@/components/TargetCursor";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "IEEE Student Branch MRIIRS",
  description: "Engineering ideas. Inspiring innovation.",
  openGraph: {
    siteName: "IEEE Student Branch MRIIRS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <QueryProvider>
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor
            parallaxOn
            hoverDuration={0.2}
            cursorColor="#ffffff"
            cursorColorOnTarget="#B497CF"
          />
          <ScrollProgress />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <GoToTop />
          <Footer />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
