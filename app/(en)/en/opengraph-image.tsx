/**
 * app/(en)/en/opengraph-image.tsx — en OG 이미지 (URL: /en/opengraph-image)
 */
import { buildOgImage, OG_SIZE } from "../../lib/og";
import { copy } from "../../lib/copy";

export const alt = copy.en.meta.ogImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage("en");
}
