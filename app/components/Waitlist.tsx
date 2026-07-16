/**
 * app/components/Waitlist.tsx — waitlist 이메일 폼
 * ─────────────────────────────────────────────────────────
 * 불변: Formspree 엔드포인트 mlgkkrrv (운영 자산 계승 — 변경 금지)
 * v2 검증 패턴 계승: 허니팟(_gotcha) · aria-live · aria-invalid · 중복 제출 가드 ·
 * iOS 줌 방지(16px). 스타일만 크로노 앰버 트랙 필로 교체.
 * 리스크 제거 마이크로카피(Runna 패턴)는 폼 하단 고정 노출.
 */
"use client";

import { useState } from "react";
import type { Copy } from "../lib/copy";
import type { Locale } from "../lib/locales";

/** Formspree 엔드포인트 — 절대 변경 금지 (charter 불변 조건) */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgkkrrv";

type Props = {
  lang: Locale;
  t: Copy["waitlist"];
  /** 페이지 내 폼이 2회 등장 — aria id 충돌 방지용 접두사 */
  idPrefix: string;
};

type Status = "idle" | "loading" | "done" | "error";

export default function Waitlist({ lang, t, idPrefix }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [inputError, setInputError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "done") return;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInputError(true);
      return;
    }

    const form = e.currentTarget;
    setInputError(false);
    setStatus("loading");

    try {
      const fd = new FormData();
      fd.append("email", email);
      fd.append(
        "_subject",
        lang === "ko" ? "rungle 사전 등록 신청" : "rungle Early Access"
      );
      /* 허니팟: 봇이 채운 값을 그대로 전송해야 Formspree 스팸 감지가 동작 */
      const gotcha =
        (form.elements.namedItem("_gotcha") as HTMLInputElement | null)
          ?.value ?? "";
      fd.append("_gotcha", gotcha);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="metric py-3 text-xl text-amber"
      >
        {t.done}
      </p>
    );
  }

  const errorId = `${idPrefix}-waitlist-error`;

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex w-full flex-col gap-3 sm:flex-row"
      >
        {/* 허니팟 — 사람 눈에 안 보임 */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (inputError) setInputError(false);
          }}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          aria-invalid={inputError}
          aria-describedby={inputError ? errorId : undefined}
          disabled={status === "loading"}
          className={`w-full rounded-full border bg-paper px-5 py-3.5 text-base text-canvas outline-none transition placeholder:text-muted disabled:opacity-60 focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber ${
            inputError
              ? "border-error ring-1 ring-error"
              : "border-transparent"
          }`}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="amber-glow shrink-0 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-on-primary transition active:bg-amber-pressed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          {status === "loading" ? (
            <span
              className="inline-flex items-center gap-1"
              aria-label={t.submitting}
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
            </span>
          ) : (
            t.submit
          )}
        </button>
      </form>

      {/* 리스크 제거 마이크로카피 (Runna·OpusClip 패턴 — 진실한 약속만) */}
      <p className="mt-3 text-sm text-body">{t.microcopy}</p>

      {inputError && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-error">
          {t.invalidEmail}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-error">
          {t.error}
        </p>
      )}
    </div>
  );
}
