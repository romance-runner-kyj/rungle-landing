/**
 * app/lib/seo.ts — SEO/메타데이터 단일 진실원천 (v2 검증 구조 계승)
 * ─────────────────────────────────────────────────────────
 * - ko = "/", en = "/en" · hreflang 3종(ko-KR/en-US/x-default)
 * - SITE_URL은 NEXT_PUBLIC_SITE_URL로 override 가능 (빌드타임 인라인 —
 *   Vercel env 변경 시 재배포 필요)
 * - OG 이미지는 opengraph-image.tsx 파일 컨벤션으로 자동 주입
 */
import type { Metadata } from "next";
import { LOCALE_META, type Locale } from "./locales";
import { copy } from "./copy";

// 랜딩은 rungle.app(apex)에서 직접 서빙한다. landing.rungle.app은 rungle.app으로 301 (rungle#1111).
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://rungle.app";

function canonicalPath(lang: Locale): string {
  return LOCALE_META[lang].path;
}

export function buildMetadata(lang: Locale): Metadata {
  const t = copy[lang].meta;
  const localeMeta = LOCALE_META[lang];
  const path = canonicalPath(lang);
  const absoluteUrl = `${SITE_URL}${path === "/" ? "" : path}`;

  const otherLang: Locale = lang === "ko" ? "en" : "ko";
  const otherLocaleMeta = LOCALE_META[otherLang];

  return {
    metadataBase: new URL(SITE_URL),
    /* iOS Safari 스마트 앱 배너 — 방문자 지역의 스토어로 Apple이 알아서 연결 */
    itunes: { appId: "6795858744" },
    title: t.title,
    description: t.description,
    alternates: {
      canonical: path,
      languages: {
        "ko-KR": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      url: absoluteUrl,
      siteName: "rungle",
      locale: localeMeta.ogLocale,
      alternateLocale: [otherLocaleMeta.ogLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}
