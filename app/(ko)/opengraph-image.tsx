/**
 * app/(ko)/opengraph-image.tsx — ko OG 이미지 (URL: /opengraph-image)
 * 파일 컨벤션으로 og:image 자동 주입. 실체는 lib/og.tsx 공용 빌더.
 */
import { buildOgImage, OG_SIZE } from "../lib/og";
import { copy } from "../lib/copy";

export const alt = copy.ko.meta.ogImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage("ko");
}
