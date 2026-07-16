/**
 * scripts/capture-logo.mjs — 로고 영상 프레임 캡처 (브리프: 헤드리스 캡처 → ffmpeg)
 * 사용: node scripts/capture-logo.mjs <outDir> [frames-html]
 *   frames-html 기본값: logo-frames.html (등속 랩). 플래시 버전: logo-frames-flash.html
 * 출력: <outDir>/f_0000.png … 투명 배경(알파) 1080×1080 PNG 시퀀스
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = process.argv[2] ?? "logo-frames";
const PAGE = process.argv[3] ?? "logo-frames.html";
await mkdir(OUT, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const pageUrl = "file://" + join(here, PAGE);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1080 },
  deviceScaleFactor: 1,
});
await page.goto(pageUrl);

const total = await page.evaluate(() => window.TOTAL_FRAMES);
for (let i = 0; i < total; i++) {
  await page.evaluate((n) => window.setFrame(n), i);
  await page.screenshot({
    path: join(OUT, `f_${String(i).padStart(4, "0")}.png`),
    omitBackground: true, // 알파 유지
  });
  if (i % 24 === 0) console.log(`frame ${i}/${total}`);
}
console.log(`done: ${total} frames → ${OUT}`);
await browser.close();
