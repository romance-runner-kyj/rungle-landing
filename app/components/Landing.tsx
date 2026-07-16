/**
 * app/components/Landing.tsx — 랜딩 페이지 본문 (ko/en 공용)
 * ─────────────────────────────────────────────────────────
 * 섹션 흐름: 히어로+폼 → 핵심 가치 → 러너 페인 → 기능 3카드 →
 * 베스트컷 셀렉 데모 → 3단계(스크롤 점등) → 트래커 호환 → 감성(실사 배경) →
 * FAQ → 최종 CTA+폼 → 푸터
 *
 * CTA는 처음(히어로 폼)과 끝(최종 폼)에만 — 중앙 반복 제거 (사용자 결정 07-02).
 * 모션: 히어로 스태거 + Reveal + 목업 릴스 루프 + 모션 로고 + 트랙 궤도.
 * 전부 prefers-reduced-motion 대응. 앰버 규율(design.md) 준수.
 */
import Image from "next/image";
import Link from "next/link";
import BestcutDemo from "./BestcutDemo";
import BrandPill from "./BrandPill";
import Nav from "./Nav";
import PhoneMockup from "./PhoneMockup";
import Reveal from "./Reveal";
import StepsFlow from "./StepsFlow";
import TrackerIcon from "./TrackerIcons";
import Waitlist from "./Waitlist";
import type { Copy } from "../lib/copy";
import type { Locale } from "../lib/locales";

type Props = {
  lang: Locale;
  t: Copy;
};

export default function Landing({ lang, t }: Props) {
  const toggleHref = lang === "ko" ? "/en" : "/";

  return (
    <>
      <Nav lang={lang} t={t.nav} />

      <main>
        {/* ── 1. 히어로 — Submagic 카피 공식 × Relive 폰 목업 ── */}
        <section className="relative mx-auto max-w-6xl overflow-x-clip px-4 pb-20 pt-32 md:pb-28 md:pt-40">
          {/* 히어로 대부분을 덮는 400m 트랙 궤도 — 달리는 점이 콘텐츠 뒤를 돈다 */}
          <div
            aria-hidden="true"
            className="track-orbit hero-rise hero-rise-5 -z-10 inset-x-0 top-24 bottom-8 hidden md:block"
          />
          <div className="grid items-center gap-14 md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col items-start gap-6">
              <span className="hero-rise hero-rise-1 rounded-full border border-hairline px-3.5 py-1 text-xs font-medium tracking-wide text-body">
                {t.hero.badge}
              </span>
              <h1 className="hero-rise hero-rise-2 text-4xl font-bold leading-[1.15] tracking-tight text-ink sm:text-5xl md:text-6xl">
                {t.hero.headline1}
                <br />
                <span className="text-amber">{t.hero.headline2}</span>
              </h1>
              <p className="hero-rise hero-rise-3 max-w-lg text-lg leading-relaxed text-body">
                {t.hero.sub}
              </p>
              <div className="hero-rise hero-rise-4 mt-2 w-full">
                <Waitlist lang={lang} t={t.waitlist} idPrefix="hero" />
              </div>
            </div>

            <div className="hero-rise hero-rise-5 relative">
              <PhoneMockup t={t.mockup} />
            </div>
          </div>
        </section>

        {/* ── 2. 핵심 가치 — 당신의 러닝 스토리 ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-3xl px-4 py-24 text-center md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold leading-snug tracking-tight text-ink md:text-4xl">
                {t.value.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-relaxed text-body">
                {t.value.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 3. 러너 페인 — 정성적 프루프 (진실성 가드: 실측 인터뷰만) ── */}
        <section className="border-t border-hairline bg-media-well">
          <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.pain.title}
              </h2>
              <p className="mt-3 text-base text-body">{t.pain.sub}</p>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {t.pain.cards.map((card, i) => (
                <Reveal key={card.label} delay={i * 120}>
                  <div className="card-lift h-full rounded-xl border border-hairline bg-surface-card p-7">
                    <div className="metric text-4xl text-ink">{card.stat}</div>
                    <div className="mt-1 text-sm font-semibold text-muted">
                      {card.label}
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-body">
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. 기능 3카드 — PRD USP 그대로 ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.features.title}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {t.features.cards.map((card, i) => (
                <Reveal key={card.name} delay={i * 120}>
                  <div className="card-lift h-full rounded-xl border border-hairline bg-canvas-elevated p-7">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                      {card.name}
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-body">
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* 얼굴 불가침 고지 — 마케팅이 아니라 제품 제약의 고지 (PRD §11) */}
            <Reveal delay={240}>
              <div className="mt-8 rounded-xl border border-hairline px-6 py-5">
                <p className="text-[15px] leading-relaxed text-body">
                  {t.features.faceGuard}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. 베스트컷 셀렉 데모 — 핵심 USP 시각화 ── */}
        <section className="border-t border-hairline bg-media-well">
          <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.bestcut.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-body">
                {t.bestcut.sub}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-12">
                <BestcutDemo t={t.bestcut} />
              </div>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-6 text-sm text-muted">{t.bestcut.note}</p>
            </Reveal>
          </div>
        </section>

        {/* ── 6. 3단계 — 스크롤 점등 (기록 연동 → AI 편집 → 릴스 공유) ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.steps.title}
              </h2>
              <p className="mt-3 text-base text-body">{t.steps.sub}</p>
            </Reveal>
            <div className="mt-12">
              <StepsFlow t={t.steps} />
            </div>
          </div>
        </section>

        {/* ── 7. 트래커 호환 — HealthKit 허브 (Relive 'For everyone' 번안) ── */}
        <section className="border-t border-hairline bg-media-well">
          <div className="mx-auto max-w-3xl px-4 py-24 text-center md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.trackers.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-body">
                {t.trackers.body}
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
              <p className="mt-6 text-sm text-muted">{t.trackers.note}</p>
            </Reveal>
          </div>
        </section>

        {/* ── 8. 감성 — 동기 루프 (실사 배경 + 스크림) ── */}
        <section className="relative overflow-hidden border-t border-hairline">
          <Image
            src="/media/emotive-dawn.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
          {/* 가독 스크림 — 미디어 위 텍스트는 스크림으로 (design Do) */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent" />
          <div className="relative mx-auto max-w-3xl px-4 py-32 text-center md:py-44">
            <Reveal>
              <h2 className="text-3xl font-bold leading-snug tracking-tight text-ink md:text-4xl">
                {t.emotive.title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                {t.emotive.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 9. FAQ — details/summary 아코디언 ── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-3xl px-4 py-24 md:py-32">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.faq.title}
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-col">
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

        {/* ── 10. 최종 CTA + 폼 ── */}
        <section id="waitlist" className="border-t border-hairline">
          <div className="mx-auto flex max-w-3xl scroll-mt-24 flex-col items-center px-4 py-24 text-center md:py-32">
            <Reveal>
              <BrandPill size="lg" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-10 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t.finalCta.title}
              </h2>
              <p className="mt-4 text-lg text-body">{t.finalCta.sub}</p>
            </Reveal>
            <Reveal delay={200} className="w-full">
              <div className="mt-8 flex w-full justify-center">
                <div className="flex w-full max-w-md flex-col items-center">
                  <Waitlist lang={lang} t={t.waitlist} idPrefix="final" />
                </div>
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
