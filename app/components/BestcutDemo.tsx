/**
 * app/components/BestcutDemo.tsx — 베스트컷 셀렉 데모 (핵심 USP 시각화)
 * ─────────────────────────────────────────────────────────
 * design.html bestcut-card 문법: 미디어는 0px(각지게) · 4:5 · 랭크는 트랙 필,
 * 상위 3만 앰버 · 근거 태그는 사람의 말 · 썸네일 필터·틴트 금지.
 * 앰버 링이 1→2→3위를 순회(.bestcut-ring-*, CSS만) — AI가 후보를 훑는 감각.
 * 자동 추천에는 AI 추천 배지 — 자동과 수동의 경계를 숨기지 않는다.
 */
import Image from "next/image";
import type { Copy } from "../lib/copy";

type Props = {
  t: Copy["bestcut"];
};

/* 실사 (Unsplash License) — 후보 4컷 */
const CUT_IMAGES = [
  "/media/cut-face.jpg",
  "/media/cut-track.jpg",
  "/media/cut-steps.jpg",
  "/media/cut-stride.jpg",
];

export default function BestcutDemo({ t }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-hidden="true">
      {t.cards.map((card, i) => (
        <div key={i} className="relative aspect-[4/5] overflow-hidden bg-media-well">
          <Image
            src={CUT_IMAGES[i]}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {/* 하단 스크림 + 근거 태그 (사람의 말) */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/75 to-transparent" />
          <div className="absolute inset-x-2 bottom-2 flex flex-wrap gap-1">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-black/50 px-2 py-0.5 text-[11px] text-ink backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 랭크 배지 — 트랙 필, 상위 3만 앰버 */}
          {card.rank !== null && (
            <span className="metric absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber text-[13px] leading-none text-on-primary">
              {card.rank}
            </span>
          )}

          {/* AI 추천 배지 — 1위 카드에만 */}
          {card.rank === 1 && (
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-ink backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-info" />
              {t.aiBadge}
            </span>
          )}

          {/* 상위 3 순회 하이라이트 링 (선택 상태 — 앰버의 정당한 사용처) */}
          {card.rank !== null && (
            <span
              className={`bestcut-ring bestcut-ring-${card.rank} pointer-events-none absolute inset-0 border-2 border-amber`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
