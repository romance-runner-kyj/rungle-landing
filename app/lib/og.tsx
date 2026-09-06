/**
 * app/lib/og.tsx — OG 이미지 공용 빌더 (ko/en)
 * ─────────────────────────────────────────────────────────
 * brand-pill 기하 스펙(트랙 필 + 달리는 점)에서 파생. 크로노 앰버 다크.
 * 폰트: public/fonts/의 otf/ttf 로컬 로드 (satori는 woff2 미지원 — v2 M-3 교훈).
 * 폰트 로드 실패 시 시스템 폰트 폴백으로 OG 생성 자체는 보장.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { copy } from "./copy";
import type { Locale } from "./locales";

export const OG_SIZE = { width: 1200, height: 630 };

const AMBER = "#FFB300";
const CANVAS = "#131313";
const INK = "#FFFFFF";
const BODY = "#A6A6A6";
const ON_PRIMARY = "#1A1403";
const HAIRLINE = "#2C2C2C";

export async function buildOgImage(lang: Locale) {
  const t = copy[lang];

  const [pretendard, barlow] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Pretendard-Bold.otf")).catch(
      () => null
    ),
    readFile(
      join(process.cwd(), "public/fonts/BarlowCondensed-SemiBold.ttf")
    ).catch(() => null),
  ]);

  const sans = pretendard ? "Pretendard" : "sans-serif";
  const metric = barlow ? "Barlow Condensed" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: CANVAS,
          fontFamily: sans,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 앰버 글로우 — 우상단 */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -120,
            width: 640,
            height: 520,
            background: "rgba(255,179,0,0.14)",
            filter: "blur(110px)",
            display: "flex",
          }}
        />

        {/* brand-pill 로고 — 트랙 필 + 달리는 점 */}
        <div style={{ display: "flex", position: "relative", marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `4px solid ${AMBER}`,
              borderRadius: 999,
              padding: "12px 36px",
              color: INK,
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            rungle
          </div>
          <div
            style={{
              position: "absolute",
              top: -7,
              left: 150,
              width: 16,
              height: 16,
              borderRadius: 999,
              background: AMBER,
              boxShadow: "0 0 18px rgba(255,179,0,0.6)",
              display: "flex",
            }}
          />
        </div>

        {/* 헤드라인 — 히어로 3구, 마지막 구만 앰버 */}
        <div
          style={{
            display: "flex",
            color: INK,
            fontSize: 72,
            lineHeight: 1.15,
            fontWeight: 700,
          }}
        >
          {t.hero.lines[0]}
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 72,
            lineHeight: 1.15,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          <span style={{ color: INK }}>{t.hero.lines[1]}</span>
          <span style={{ color: AMBER }}>{t.hero.lines[2]}</span>
        </div>

        {/* 기록 칩 행 — 전광판의 목소리 (Barlow Condensed) */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {[
            ["8.42", "KM"],
            ["5'42\"", "PACE"],
            ["48:12", "TIME"],
          ].map(([num, unit]) => (
            <div
              key={unit}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                border: `2px solid ${HAIRLINE}`,
                borderRadius: 999,
                padding: "12px 30px",
              }}
            >
              <span
                style={{ fontFamily: metric, fontSize: 40, color: INK }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily: metric,
                  fontSize: 20,
                  color: BODY,
                  letterSpacing: 2,
                }}
              >
                {unit}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              background: AMBER,
              color: ON_PRIMARY,
              borderRadius: 999,
              padding: "14px 32px",
              fontSize: 26,
              fontWeight: 700,
              marginLeft: 8,
            }}
          >
            {t.hero.badge}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        ...(pretendard
          ? [
              {
                name: "Pretendard",
                data: pretendard,
                style: "normal" as const,
                weight: 700 as const,
              },
            ]
          : []),
        ...(barlow
          ? [
              {
                name: "Barlow Condensed",
                data: barlow,
                style: "normal" as const,
                weight: 600 as const,
              },
            ]
          : []),
      ],
    }
  );
}
