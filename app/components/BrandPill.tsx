/**
 * app/components/BrandPill.tsx — 로고 (docs/design.html brand-pill 기하 스펙)
 * ─────────────────────────────────────────────────────────
 * 400m 트랙 필: 앰버 2px 외곽선 + 트랙 위 앰버 도트("달리는 점").
 * 별도 로고 파일 없음 — 이 컴포넌트가 로고 원본이며 파비콘·OG도 같은 스펙에서 파생.
 * 모션(웹): 로드 시 도트가 트랙을 정확히 한 바퀴 돌고 제자리 정지 (.pill-dot,
 * globals.css). offset-path 미지원·Reduce Motion에서는 정적 도트.
 * 영상 2종(알파·MP4) 산출물은 다음 세션.
 */
type Props = {
  size?: "sm" | "lg";
};

export default function BrandPill({ size = "sm" }: Props) {
  const isLg = size === "lg";
  return (
    <span
      className={`relative inline-flex items-center rounded-full border-2 border-amber ${
        isLg ? "px-6 py-2.5" : "px-4 py-1.5"
      }`}
    >
      <span
        className={`font-semibold tracking-tight text-ink ${
          isLg ? "text-2xl" : "text-base"
        }`}
      >
        rungle
      </span>
      {/* 달리는 점 — 트랙(외곽선) 위, 오른쪽 위 (인스타 점 위치) */}
      <span
        aria-hidden="true"
        className={`pill-dot amber-dot-glow absolute rounded-full bg-amber ${
          isLg
            ? "-top-[5px] right-7 h-2.5 w-2.5"
            : "-top-1 right-5 h-2 w-2"
        }`}
      />
    </span>
  );
}
