/**
 * app/(en)/layout.tsx — 영어 루트 레이아웃 (URL: /en)
 * (ko)·(en) 각 루트가 <html lang>을 SSR한다.
 */
import "../globals.css";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import JsonLd from "../components/JsonLd";
import MetaPixel from "../components/MetaPixel";
import ThemeScript from "../components/ThemeScript";
import { buildMetadata } from "../lib/seo";
import { notoSans, bodoni, anton } from "../lib/fonts";

export const metadata = buildMetadata("en");

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${notoSans.variable} ${bodoni.variable} ${anton.variable}`}>
      <head>
        <ThemeScript />
        <JsonLd lang="en" />
      </head>
      <body className="flex min-h-full flex-col">{children}<MetaPixel /></body>
    </html>
  );
}
