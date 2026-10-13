/**
 * app/components/ThemeToggle.tsx — 라이트/다크 수동 전환 (Nav, 언어 토글 왼쪽)
 * ─────────────────────────────────────────────────────────
 * 기본은 OS 외관(prefers-color-scheme). 누르면 반대 모드를 <html data-theme>에 쓰고
 * localStorage("theme")에 남긴다. 첫 페인트 전 적용은 layout의 인라인 스크립트가 맡는다.
 * 아이콘은 현재 모드(라이트=해, 다크=달). 앱 캡처 <picture>의 다크 <source>는 OS만 보므로
 * 수동 전환 때 source.media를 all / not all 로 바꿔 캡처도 같이 따라가게 한다.
 */
"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme, explicit: boolean) {
  const root = document.documentElement;
  if (explicit) root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
  const media = !explicit ? "(prefers-color-scheme: dark)" : theme === "dark" ? "all" : "not all";
  document
    .querySelectorAll<HTMLSourceElement>('picture > source[media]')
    .forEach((s) => s.setAttribute("media", media));
}

type Props = {
  labelToDark: string;
  labelToLight: string;
};

const CHANGE = "rungle-theme-change";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

/* 현재 모드: <html data-theme>(ThemeScript가 첫 페인트 전에 심음)이 있으면 그것, 없으면 OS */
function readTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" || attr === "light" ? attr : systemTheme();
}

export default function ThemeToggle({ labelToDark, labelToLight }: Props) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);

  /* 하이드레이션 뒤 <picture> 소스를 현재 모드에 맞춘다(수동 저장값이 있을 때만 강제) */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    const explicit = stored === "light" || stored === "dark";
    applyTheme(explicit ? (stored as Theme) : systemTheme(), explicit);
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}
    applyTheme(next, true);
    window.dispatchEvent(new Event(CHANGE));
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? labelToLight : labelToDark}
      data-theme-toggle
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-control text-body hover:text-ink"
    >
      {/* 해 / 달 — 현재 모드 표시. SSR·첫 렌더는 해(라이트)로 두고 effect에서 맞춘다 */}
      {isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
