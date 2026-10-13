/**
 * app/components/AppStoreButton.tsx — App Store CTA(텍스트 버튼 + 마이크로카피).
 * 링크는 로케일별 스토어 URL(LOCALE_META.appStoreUrl)이다.
 * 같은 탭에서 이동한다 — iOS Safari가 App Store 앱을 바로 연다.
 * Apple 로고·배지 아트워크는 쓰지 않는다(상표 라이선스). 텍스트 CTA만 쓴다.
 * 정렬은 부모 flex-col이 정하므로 fragment를 반환한다.
 */
import { LOCALE_META, type Locale } from "../lib/locales";
import type { Copy } from "../lib/copy";

type Props = {
  lang: Locale;
  t: Copy["cta"];
};

export default function AppStoreButton({ lang, t }: Props) {
  return (
    <>
      <a
        href={LOCALE_META[lang].appStoreUrl}
        className="inline-flex h-[52px] items-center rounded-lg border border-control bg-action px-7 text-[15px] font-semibold text-on-action transition active:bg-action-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {t.label}
      </a>
      <p className="text-sm text-body">{t.microcopy}</p>
    </>
  );
}
