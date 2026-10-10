/**
 * app/lib/locales.ts — 로케일 상수
 * ko = "/" (기본), en = "/en" — v2 검증 구조 계승
 * appStoreUrl: App Store 캠페인 링크. ct(landing_ko/landing_en)로 유입 로케일을 구분한다.
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
      "https://apps.apple.com/app/apple-store/id6795858744?pt=129210758&ct=landing_ko&mt=8",
  },
  en: {
    ogLocale: "en_US",
    htmlLang: "en",
    path: "/en",
    appStoreUrl:
      "https://apps.apple.com/app/apple-store/id6795858744?pt=129210758&ct=landing_en&mt=8",
  },
};
