import AppShell from "@/components/layout/AppShell";
import type { Metadata } from "next";
// @ts-ignore Next.js resolves global CSS imports at build time.
import "./globals.css";
export const metadata: Metadata = {
  title: "CeylonBio 3D — See biology differently",
  description:
    "An interactive biology learning studio for Sri Lankan A/L students. Explore cells, organs, and molecules in 3D.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
