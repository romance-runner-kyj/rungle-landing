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
        <circle
          className="mark-dot"
          cx="122.3"
          cy="14.3"
          r="12.5"
          fill="currentColor"
        />
      </svg>
      <span className="font-wordmark text-[52px] leading-none tracking-[-1px]">
        RUNGLE
      </span>
    </span>
  );
}
