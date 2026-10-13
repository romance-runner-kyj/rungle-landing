/** app/components/Nav.tsx — 고정 헤더: 홈 로고, 언어 토글(Link 풀 페이지 전환), App Store CTA. */
import Link from "next/link";
import BrandPill from "./BrandPill";
import type { Copy } from "../lib/copy";
import { LOCALE_META, type Locale } from "../lib/locales";

type Props = {
  lang: Locale;
  t: Copy["nav"];
};

export default function Nav({ lang, t }: Props) {
  const homeHref = lang === "ko" ? "/" : "/en";
  const toggleHref = lang === "ko" ? "/en" : "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={homeHref} aria-label="rungle home">
          <BrandPill size="sm" />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={toggleHref}
            aria-label={t.langToggleAria}
            className="rounded-lg border border-control px-3.5 py-1.5 text-sm font-medium text-body hover:text-ink"
          >
            {t.langToggle}
          </Link>
          <a
            href={LOCALE_META[lang].appStoreUrl}
            className="rounded-lg border border-control bg-action px-4 py-1.5 text-sm font-semibold text-on-action active:bg-action-pressed"
          >
            {t.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
