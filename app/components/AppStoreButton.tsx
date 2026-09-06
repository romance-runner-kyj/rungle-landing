/**
 * app/components/AppStoreButton.tsx — App Store 이동 주 CTA
 * ─────────────────────────────────────────────────────────
 * 출시 후 waitlist 폼을 대체. 로케일별 스토어 링크는 LOCALE_META.appStoreUrl.
 * 같은 탭 이동 — iOS Safari는 apps.apple.com을 App Store 앱으로 바로 연다.
 * 부모 flex-col이 정렬(start/center)을 결정하므로 fragment로 반환.
 * Apple 로고·배지 아트워크는 쓰지 않는다(상표 라이선스) — 텍스트 CTA만.
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
        className="amber-glow inline-flex items-center rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-on-primary transition active:bg-amber-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {t.label}
      </a>
      <p className="text-sm text-body">{t.microcopy}</p>
    </>
  );
}
