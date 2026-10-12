/**
 * app/components/JsonLd.tsx — 검색 엔진용 구조화 데이터 (rungle#1759)
 * 구글이 "rungle"·"런글"이라는 이름과 rungle.app, App Store 페이지를 같은 대상으로
 * 묶도록 Organization과 SoftwareApplication을 적는다. 가격은 정책 미확정이라 넣지 않는다(copy.ts 진실성 가드).
 */
import { LOCALE_META, type Locale } from "../lib/locales";
import { copy } from "../lib/copy";
import { SITE_URL } from "../lib/seo";

// LOCALE_META.appStoreUrl은 유입을 세는 캠페인 링크(ct=…)라 쓰지 않는다. sameAs에는 App Store 정식 주소를 적는다.
const APP_STORE_PAGE_URLS: Record<Locale, string> = {
  ko: "https://apps.apple.com/kr/app/%EB%9F%B0%EA%B8%80-rungle/id6795858744",
  en: "https://apps.apple.com/us/app/rungle/id6795858744",
};

export default function JsonLd({ lang }: { lang: Locale }) {
  const localeMeta = LOCALE_META[lang];
  const appStoreUrls = Object.values(APP_STORE_PAGE_URLS);
  const organizationId = `${SITE_URL}/#organization`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "rungle",
        alternateName: "런글",
        url: SITE_URL,
        // public/brand/는 .vercelignore의 brand 줄에 걸려 배포되지 않는다 — 배포되는 사이트 아이콘을 쓴다.
        logo: `${SITE_URL}/icon.svg`,
        sameAs: appStoreUrls,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: "rungle",
        alternateName: "런글",
        description: copy[lang].meta.description,
        operatingSystem: "iOS",
        applicationCategory: "HealthApplication",
        inLanguage: localeMeta.htmlLang,
        url: APP_STORE_PAGE_URLS[lang],
        sameAs: appStoreUrls,
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON 안의 "<"가 </script>로 읽히지 않도록 이스케이프한다(Next.js 공식 안내 방식).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
