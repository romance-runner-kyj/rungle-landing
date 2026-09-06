/**
 * app/components/PhoneMockup.tsx — 폰 목업 (실제 앱 화면 1장)
 * ─────────────────────────────────────────────────────────
 * 화면은 App Store 판넬 원본 캡처(rungle/design/appstore/src/captures{,-en})를
 * 720px webp로 줄인 것 — CSS 재현 없이 실제 UI를 그대로 보여준다.
 * 폰 전체 부유(.float) · prefers-reduced-motion 시 정지.
 */
import Image from "next/image";
import type { Locale } from "../lib/locales";

export type AppScreen = "share" | "pathchoice" | "editor" | "bestcut";

type Props = {
  lang: Locale;
  screen: AppScreen;
  priority?: boolean;
};

export default function PhoneMockup({ lang, screen, priority }: Props) {
  return (
    <div
      aria-hidden="true"
      className="float relative mx-auto w-[270px] shrink-0 select-none sm:w-[300px]"
    >
      {/* 폰 프레임 */}
      <div className="rounded-[44px] border border-hairline bg-media-well p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        {/* 스크린 — 캡처 원본 비율(1320×2868) */}
        <div className="relative aspect-[1320/2868] overflow-hidden rounded-[36px] bg-media-well">
          <Image
            src={`/media/app/${lang}/${screen}.webp`}
            alt=""
            fill
            sizes="300px"
            priority={priority}
            className="object-cover"
          />
        </div>
      </div>

      {/* 폰 뒤 은은한 앰버 광 — 비주얼 포커스 */}
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
