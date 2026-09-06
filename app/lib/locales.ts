/**
 * app/lib/locales.ts — 로케일 상수
 * ko = "/" (기본), en = "/en" — v2 검증 구조 계승
 * appStoreUrl: 한국 스토어는 ko, 그 외(영미권 포함)는 미국 스토어 링크.
 */
export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { ogLocale: string; htmlLang: string; path: string; appStoreUrl: string }
> = {
  ko: {
    ogLocale: "ko_KR",
    htmlLang: "ko",
    path: "/",
    appStoreUrl:
      "https://apps.apple.com/kr/app/%EB%9F%B0%EA%B8%80-rungle/id6795858744",
  },
  en: {
    ogLocale: "en_US",
    htmlLang: "en",
    path: "/en",
    appStoreUrl: "https://apps.apple.com/us/app/rungle/id6795858744",
  },
};
