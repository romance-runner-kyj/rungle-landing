/**
 * app/components/PhoneMockup.tsx — 히어로 폰 목업 (CSS 시뮬레이션 v2)
 * ─────────────────────────────────────────────────────────
 * 실제 앱 화면·데모 영상 없음(사용자 확인 2026-07-02) → design.html 토큰으로
 * "릴스 초안 재생" 화면을 CSS로 재현. 사진 자리는 그라디언트 플레이스홀더.
 *
 * 재생 시뮬레이션 (Relive "폰 목업 안에서 릴스 재생" 패턴):
 *  - 3컷 크로스페이드 9초 루프 (globals.css .reel-scene-*)
 *  - 필름스트립 활성 링이 재생 컷을 따라 이동 (.thumb-ring-*)
 *  - 구간 추천 트림 바(S5 segment-trim-bar) + 트랙 필 위 재생 헤드 도트(.reel-head, S8 render-progress-track)
 *  - 경로 오버레이 드로잉 + 경로를 달리는 도트(.route-runner, 오버레이 모션 "루트 드로우")
 *  - 폰 전체 부유(.float) · prefers-reduced-motion 시 전부 정지(1컷 고정)
 */
import Image from "next/image";
import type { Copy } from "../lib/copy";

type Props = {
  t: Copy["mockup"];
};

/* 3컷 실사 (Unsplash License — 상업 사용 가능) — 질주 → 골든아워 → 계단 */
const SCENES = [
  "/media/reel-stride.jpg",
  "/media/reel-golden.jpg",
  "/media/reel-stairs.jpg",
];

export default function PhoneMockup({ t }: Props) {
  return (
    <div
      aria-hidden="true"
      className="float relative mx-auto w-[270px] select-none sm:w-[300px]"
    >
      {/* 폰 프레임 */}
      <div className="rounded-[44px] border border-hairline bg-media-well p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        {/* 스크린 */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[36px] bg-media-well">
          {/* ── 미디어 스테이지: 릴스 3컷 크로스페이드 (실사) ── */}
          {SCENES.map((src, i) => (
            <div
              key={src}
              className={`reel-scene reel-scene-${i + 1} absolute inset-0`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="300px"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
          {/* 상·하단 스크림 (미디어 위 가독은 스크림으로 — design Do) */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 to-transparent" />

          {/* ── 경로 오버레이 — 드로잉 루프 (기록 그래픽의 일부) ── */}
          <svg
            viewBox="0 0 120 90"
            className="absolute left-4 top-[38%] w-24 opacity-90"
            fill="none"
          >
            <path
              className="route-path"
              d="M8 78 C 20 62, 14 44, 30 38 S 62 46, 74 32 S 96 10, 112 14"
              stroke="#FFB300"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="78" r="3" fill="#FFB300" opacity="0.7" />
            {/* 경로를 달리는 도트 — 오버레이 모션 "루트 드로우 + 달리는 점" */}
            <circle className="route-runner" r="2.5" fill="#FFB300" />
          </svg>

          {/* ── 상단 크롬: 세션 정보 + AI 배지 ── */}
          <div className="absolute inset-x-0 top-0 flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">
                {t.sessionTitle}
              </span>
              <span className="metric text-[11px] tracking-wide text-body">
                0:08 / 0:12
              </span>
            </div>
            <span className="text-[11px] text-body">{t.sessionMeta}</span>
            {/* AI 추천 배지 — 자동과 수동의 경계를 숨기지 않는다 (design Do) */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-ink backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-info" />
                {t.aiBadge}
              </span>
              {t.reasonTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-black/40 px-2 py-0.5 text-[10px] text-body backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── 기록 오버레이 칩 (트랙 필 · 블러 배경 · 실기록 문법) ── */}
          <div className="absolute inset-x-0 bottom-[10rem] flex justify-center gap-2 px-4">
            <span className="flex items-baseline gap-1 rounded-full bg-black/45 px-3.5 py-1.5 backdrop-blur-md">
              <span className="metric text-xl leading-none text-ink">8.42</span>
              <span className="metric text-[9px] tracking-[0.08em] text-body">
                KM
              </span>
            </span>
            <span className="flex items-baseline gap-1 rounded-full bg-black/45 px-3.5 py-1.5 backdrop-blur-md">
              <span className="metric text-xl leading-none text-ink">
                5&apos;42&quot;
              </span>
              <span className="metric text-[9px] tracking-[0.08em] text-body">
                PACE
              </span>
            </span>
          </div>

          {/* ── 구간 추천 트림 바 (S5 segment-trim-bar) + 트랙 필 위 재생 헤드 (S8) ── */}
          <div className="absolute inset-x-5 bottom-[9rem]">
            <div className="relative h-1.5 rounded-full bg-white/12">
              {/* AI 추천 구간 — 앰버 딤 필 (강조 아닌 안내) */}
              <div className="absolute inset-y-0 left-[20%] w-[52%] rounded-full bg-amber-dim" />
              {/* 구간 경계 트림 핸들 (44pt 탭 타깃 함의 — 무채색) */}
              <span className="absolute left-[20%] top-1/2 h-3 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/85" />
              <span className="absolute left-[72%] top-1/2 h-3 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/85" />
              {/* 재생 헤드 — 트랙을 도는 앰버 도트 (달리는 점 글로우 재사용) */}
              <span className="reel-head amber-dot-glow absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber" />
            </div>
          </div>

          {/* ── 하단: 필름스트립(순서 배지 + 이동하는 활성 링) + 공유 CTA ── */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-4">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="relative h-11 w-9 overflow-hidden rounded-lg"
                >
                  <Image
                    src={SCENES[n - 1]}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                  {/* 재생 중 컷을 따라 도는 앰버 링 */}
                  <span
                    className={`thumb-ring thumb-ring-${n} pointer-events-none absolute inset-0 rounded-lg border-2 border-amber`}
                  />
                  <span className="metric absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber text-[9px] leading-none text-on-primary">
                    {n}
                  </span>
                </div>
              ))}
              <div className="flex h-11 w-9 items-center justify-center rounded-lg border border-hairline text-body">
                +
              </div>
            </div>
            {/* S10 W4 위계: [인스타 공유] 주 CTA(앰버) + [갤러리 저장] 아웃라인 보조 */}
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center justify-center rounded-full bg-amber py-2.5 text-[13px] font-semibold text-on-primary">
                {t.shareButton}
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-body">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 폰 뒤 은은한 앰버 광 — 히어로 비주얼 포커스 */}
      <div
        className="absolute -inset-10 -z-10 opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,179,0,0.35), transparent 70%)",
        }}
      />
    </div>
  );
}
