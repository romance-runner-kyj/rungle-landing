/**
 * app/components/StepsFlow.tsx — 3단계 스크롤 연동 활성화
 * ─────────────────────────────────────────────────────────
 * 섹션이 뷰포트에 들어오면 01→02→03이 순차 점등 (번호 앰버 + 진행 바 채움).
 * 진행 문맥은 앰버의 정당한 사용처 (design.md). Reduce Motion 시 전부 점등
 * 상태로 고정 (globals.css).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Copy } from "../lib/copy";

type Props = {
  t: Copy["steps"];
};

export default function StepsFlow({ t }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        [0, 1, 2].forEach((i) => {
          timers.push(setTimeout(() => setActiveCount(i + 1), 250 + i * 450));
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <ol ref={ref} className="grid gap-10 md:grid-cols-3">
      {t.items.map((step, i) => (
        <li
          key={step.no}
          className={`step flex flex-col gap-3 ${
            i < activeCount ? "is-active" : ""
          }`}
        >
          <span className="step-no metric text-5xl">{step.no}</span>
          <span className="step-bar h-0.5 w-16 rounded-full" />
          <h3 className="text-xl font-bold text-ink">{step.title}</h3>
          <p className="text-[15px] leading-relaxed text-body">{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}
