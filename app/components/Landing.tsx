/**
 * app/components/Landing.tsx — 랜딩 페이지 본문 (ko/en 공용)
 * ─────────────────────────────────────────────────────────
 * 섹션 흐름(토스식 '한 화면 한 메시지', 결정 2026-09-06 B안):
 * 히어로(3구 + 공유 화면) → 앱 화면 4장(만들기 → 추천 사진 → 편집 → 공유, 좌우 교차)
 * → 원칙 3개 → 트래커 호환 → FAQ → 최종 App Store CTA → 푸터
 *
 * CTA는 처음(히어로)과 끝(최종)에만 — 중앙 반복 없음.
 * 앱 화면은 전부 App Store 캡처 원본(PhoneMockup) — CSS 재현 없음.
 * 모션: 히어로 스태거 + Reveal + 폰 부유 + 모션 로고 + 트랙 궤도. 전부 reduced-motion 대응.
 */
import Link from "next/link";
import AppStoreButton from "./AppStoreButton";
import BrandPill from "./BrandPill";
import Nav from "./Nav";
import PhoneMockup from "./PhoneMockup";
import Reveal from "./Reveal";
import TrackerIcon from "./TrackerIcons";
import type { Copy } from "../lib/copy";
import type { Locale } from "../lib/locales";

type Props = {
  lang: Locale;
  t: Copy;
};

/* 2줄 헤드라인 — 토스식: 마침표 없음, 줄바꿈 고정 */
function TwoLine({ lines }: { lines: [string, string] }) {
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
}

const H2 =
  "text-4xl font-extrabold leading-[1.2] tracking-[-0.03em] text-ink lg:text-5xl";

export default function Landing({ lang, t }: Props) {
  const toggleHref = lang === "ko" ? "/en" : "/";

  return (
    <>
      <Nav lang={lang} t={t.nav} />

      <main>
        {/* ── 1. 히어로 — 3구 헤드라인 × 공유 화면 ── */}
        <section className="relative mx-auto max-w-6xl overflow-x-clip px-4 pb-24 pt-32 md:pb-36 md:pt-44">
          {/* 히어로 대부분을 덮는 400m 트랙 궤도 — 달리는 점이 콘텐츠 뒤를 돈다 */}
          <div
            aria-hidden="true"
            className="track-orbit hero-rise hero-rise-5 -z-10 inset-x-0 top-24 bottom-8 hidden md:block"
          />
          <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col items-start gap-7">
              <span className="hero-rise hero-rise-1 rounded-full border border-hairline px-3.5 py-1 text-xs font-medium tracking-wide text-body">
                {t.hero.badge}
              </span>
              <h1 className="hero-rise hero-rise-2 text-5xl font-extrabold leading-[1.12] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
                {t.hero.lines[0]}
                <br />
                {t.hero.lines[1]}
                <br />
                <span className="text-amber">{t.hero.lines[2]}</span>
              </h1>
              <p className="hero-rise hero-rise-3 max-w-lg text-lg leading-relaxed text-body md:text-xl">
                {t.hero.sub[0]}
                <br className="hidden lg:block" /> {t.hero.sub[1]}
              </p>
              <div className="hero-rise hero-rise-4 mt-1 flex flex-col items-start gap-3">
                <AppStoreButton lang={lang} t={t.cta} />
              </div>
            </div>

            <div className="hero-rise hero-rise-5 relative">
              <PhoneMockup lang={lang} screen="share" priority />
            </div>
          </div>
        </section>

        {/* ── 2–5. 앱 화면 4장 — 한 화면 한 메시지, 좌우 교차 ── */}
        {t.screens.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.key}
              className={`border-t border-hairline ${flip ? "bg-media-well" : ""}`}
            >
              <div
                className={`mx-auto grid max-w-6xl items-center gap-14 px-4 py-28 md:py-36 lg:grid-cols-[1.15fr_1fr] ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="flex max-w-lg flex-col gap-5">
                    <span className="text-[15px] font-semibold tracking-wide text-amber">
                      {s.kicker}
                    </span>
                    <h2 className={H2}>
                      <TwoLine lines={s.headline} />
                    </h2>
                    <p className="text-lg leading-relaxed text-body">
                      {s.desc[0]}
                      <br className="hidden lg:block" /> {s.desc[1]}
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <PhoneMockup lang={lang} screen={s.key} />
                </Reveal>
              </div>
            </section>
          );
        })}

        {/* ── 6. 원칙 — 하지 않는 것 (제품 원칙 고지) ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-5xl px-4 py-28 md:py-36">
            <Reveal>
              <h2 className={H2}>
                <TwoLine lines={t.principles.headline} />
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {t.principles.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 120}>
                  <div className="flex flex-col gap-2.5 border-t border-hairline pt-6">
                    <span className="text-xl font-bold text-ink">
                      {item.title}
                    </span>
                    <p className="text-base leading-relaxed text-body">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. 트래커 호환 — HealthKit 허브 ── */}
        <section className="border-t border-hairline bg-media-well">
          <div className="mx-auto max-w-3xl px-4 py-28 text-center md:py-36">
            <Reveal>
              <h2 className={H2}>
                <TwoLine lines={t.trackers.headline} />
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-body">
                {t.trackers.desc[0]}
                <br className="hidden lg:block" /> {t.trackers.desc[1]}
              </p>
            </Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {t.trackers.names.map((name, i) => (
                <Reveal key={name} delay={i * 90}>
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline px-5 py-2.5 text-base font-medium text-ink transition hover:border-body">
                    <TrackerIcon name={name} className="h-5 w-5 shrink-0" />
                    {name}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300}>
              <p className="mt-6 text-sm text-body">{t.trackers.note}</p>
            </Reveal>
          </div>
        </section>

        {/* ── 8. FAQ — details/summary 아코디언 ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-3xl px-4 py-28 md:py-36">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-ink md:text-4xl">
                {t.faq.title}
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-col">
              {t.faq.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <details className="faq-item border-b border-hairline">
                    <summary className="flex items-center justify-between gap-4 py-5 text-left text-base font-semibold text-ink transition hover:text-amber md:text-lg">
                      {item.q}
                      <span
                        aria-hidden="true"
                        className="faq-chevron shrink-0 text-xl font-normal text-muted"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 pr-8 text-[15px] leading-relaxed text-body">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. 최종 CTA — App Store ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center md:py-40">
            <Reveal>
              <BrandPill size="lg" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-10 text-4xl font-extrabold leading-[1.18] tracking-[-0.03em] text-ink md:text-6xl">
                <TwoLine lines={t.finalCta.headline} />
              </h2>
              <p className="mt-5 text-lg text-body md:text-xl">{t.finalCta.sub}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-col items-center gap-3">
                <AppStoreButton lang={lang} t={t.cta} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── 푸터 ── */}
      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center">
          <p className="text-sm text-body">{t.footer.tagline}</p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{t.footer.copyright}</span>
            <span aria-hidden="true">·</span>
            <Link
              href={toggleHref}
              className="underline-offset-4 transition hover:text-body hover:underline"
            >
              {t.nav.langToggle}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
