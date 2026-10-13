/**
 * app/(ko)/layout.tsx — 한국어 루트 레이아웃 (URL: /)
 * (ko)·(en) 각 루트가 <html lang>을 SSR한다. / ↔ /en 이동은 MPA 전환.
 */
import "../globals.css";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import JsonLd from "../components/JsonLd";
import MetaPixel from "../components/MetaPixel";
import ThemeScript from "../components/ThemeScript";
import { buildMetadata } from "../lib/seo";
import { notoSans, bodoni, anton } from "../lib/fonts";

export const metadata = buildMetadata("ko");

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function KoRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`h-full antialiased ${notoSans.variable} ${bodoni.variable} ${anton.variable}`}>
      <head>
        <ThemeScript />
        <JsonLd lang="ko" />
      </head>
      <body className="flex min-h-full flex-col">{children}<MetaPixel /></body>
    </html>
  );
}
