import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffee Rush",
  description: "Coffee Rush board preview",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#f2d9b6"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
