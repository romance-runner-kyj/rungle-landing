/**
 * app/components/BrandPill.tsx — 브랜드 마크.
 * sm = `RUNGLE` 워드마크(앱 홈 헤더와 동일).
 * lg = 앱 `RungleBrandMark`(173×86 트랙, 선 13, 점 Ø25, 워드마크 Anton 52)를 viewBox 173×94로 옮긴 인라인 SVG.
 * currentColor라 다크 모드에 따라간다. 점 모션은 globals.css `.mark-dot` 참조. 파비콘·OG도 같은 기하.
 */
type Props = { size?: "sm" | "lg" };

export default function BrandPill({ size = "sm" }: Props) {
  if (size === "sm") {
    return (
      <span className="font-wordmark text-[28px] leading-none tracking-[-0.5px] text-ink">
        RUNGLE
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-center gap-5 text-ink">
      <svg
        aria-hidden="true"
        viewBox="0 0 173 94"
        width="173"
        height="94"
        fill="none"
      >
        <rect
          x="6.5"
          y="14.3"
          width="160"
          height="73"
          rx="36.5"
          stroke="currentColor"
          strokeWidth="13"
        />
        {/* 정적 점: offset-path 미지원·Reduce Motion 폴백 */}
        <circle className="mark-dot-static" cx="122.3" cy="14.3" r="12.5" fill="currentColor" />
        {/* 달리는 점: cx/cy 없이 원점에 두고 offset-path로 위치. @supports 안에서만 보인다 */}
        <circle className="mark-dot" r="12.5" fill="currentColor" />
      </svg>
      <span className="font-wordmark text-[52px] leading-none tracking-[-1px]">
        RUNGLE
      </span>
    </span>
  );
}
