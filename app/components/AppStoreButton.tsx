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
