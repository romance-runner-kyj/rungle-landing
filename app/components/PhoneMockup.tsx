/**
 * app/components/PhoneMockup.tsx — v2.1.0 실캡처의 라이트·다크 폰 목업
 * 1320×2868 비율, 720px WebP. 시스템 외관에 맞는 srcSet을 picture로 고른다.
 * 화면은 CSS로 재현하지 않는다. 캡처 20장이 모두 준비된 뒤 배포한다.
 */
import { getImageProps } from "next/image";
import type { Locale } from "../lib/locales";

export type AppScreen = "share" | "home" | "bestcut" | "photo" | "templates";
type Props = { lang: Locale; screen: AppScreen; priority?: boolean };

export default function PhoneMockup({ lang, screen, priority }: Props) {
  const common = {
    alt: "",
    fill: true,
    sizes: "300px",
    priority,
    className: "object-cover",
  };
  const light = getImageProps({
    ...common,
    src: `/media/app/${lang}/${screen}.webp`,
  });
  const dark = getImageProps({
    ...common,
    src: `/media/app/${lang}/${screen}-dark.webp`,
  });

  return (
    <div aria-hidden="true" className="relative mx-auto w-[270px] shrink-0 select-none sm:w-[300px]">
      <div className="rounded-[44px] border border-hairline bg-stage p-2 shadow-card">
        <div className="relative aspect-[1320/2868] overflow-hidden rounded-[36px] bg-stage">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={dark.props.srcSet} sizes={dark.props.sizes} />
            <img {...light.props} alt="" />
          </picture>
        </div>
      </div>
    </div>
  );
}
