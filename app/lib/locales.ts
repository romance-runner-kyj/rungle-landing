/**
 * app/lib/locales.ts — 로케일 상수
 * ko = "/" (기본), en = "/en" — v2 검증 구조 계승
 */
export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { ogLocale: string; htmlLang: string; path: string }
> = {
  ko: { ogLocale: "ko_KR", htmlLang: "ko", path: "/" },
  en: { ogLocale: "en_US", htmlLang: "en", path: "/en" },
};
