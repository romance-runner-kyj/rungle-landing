/**
 * app/lib/og.tsx — ko/en 공용 OG. 링크 미리보기는 라이트 디자인을 쓴다.
 * satori는 woff2를 못 읽어 public/fonts의 ttf 서브셋을 쓴다.
 * Bodoni ttf는 자체가 이탤릭이라 style normal로 등록한다(합성 기울임 방지).
 * 폰트 파일이 없으면 빌드가 실패한다 — 의도(조용히 깨진 OG 방지).
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { copy } from "./copy";
import type { Locale } from "./locales";

export const OG_SIZE = { width: 1200, height: 630 };

export async function buildOgImage(lang: Locale) {
  const t = copy[lang];
  const [noto, bodoni, anton] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/NotoSansKR-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/fonts/BodoniModa-MediumItalic.ttf")),
    readFile(join(process.cwd(), "public/fonts/Anton-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          padding: "60px 72px",
          background: "#FFFFFF",
          color: "#111111",
          fontFamily: "Noto Sans KR",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 40,
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          RUNGLE
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.15,
          }}
        >
          <div style={{ display: "flex" }}>{t.hero.lines[0]}</div>
          <div style={{ display: "flex" }}>{t.hero.lines[1]}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Bodoni Moda",
            fontSize: 36,
            fontWeight: 500,
            fontStyle: "normal",
            lineHeight: 1.2,
            color: "#666666",
            marginTop: 24,
          }}
        >
          {t.hero.tagline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 32,
            padding: "12px 24px",
            background: "#B9E0FD",
            color: "#111111",
            border: "1px solid #888888",
            borderRadius: 8,
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {t.hero.label}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Noto Sans KR", data: noto, style: "normal" as const, weight: 600 as const },
        { name: "Bodoni Moda", data: bodoni, style: "normal" as const, weight: 500 as const },
        { name: "Anton", data: anton, style: "normal" as const, weight: 400 as const },
      ],
    }
  );
}
