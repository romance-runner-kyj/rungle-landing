/**
 * app/(ko)/layout.tsx — 한국어 루트 레이아웃 (URL: /)
 * ─────────────────────────────────────────────────────────
 * route-group 2-root-layout (v2 검증 구조): (ko)·(en) 각 루트가 자기
 * <html lang>을 SSR — 인라인 스크립트·FOUC 없음. / ↔ /en 이동은 MPA 전환.
 */
import "../globals.css";
import type { ReactNode } from "react";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata("ko");

export default function KoRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/BarlowCondensed-SemiBold-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
