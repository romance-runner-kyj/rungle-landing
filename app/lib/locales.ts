/**
 * app/lib/locales.ts — 로케일 상수
 * ko = "/" (기본), en = "/en" — v2 검증 구조 계승
 * appStoreUrl: Airbridge 트래킹 링크(App Store로 리다이렉트). 로케일별로 다른 링크라 유입을 구분한다.
 * 스마트 앱 배너(seo.ts itunes.appId)는 트래킹 링크를 못 받아 앱 ID만 쓴다.
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
      "https://abr.ge/k025fx0",
  },
  en: {
    ogLocale: "en_US",
    htmlLang: "en",
    path: "/en",
    appStoreUrl:
      "https://abr.ge/7su3ij9",
  },
};
