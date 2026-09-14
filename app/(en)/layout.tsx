/**
 * app/(en)/layout.tsx — 영어 루트 레이아웃 (URL: /en)
 * route-group 2-root-layout — <html lang="en"> SSR.
 */
import "../globals.css";
import type { ReactNode } from "react";
import MetaPixel from "../components/MetaPixel";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata("en");

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}<MetaPixel /></body>
    </html>
  );
}
