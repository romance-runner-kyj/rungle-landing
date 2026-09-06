/**
 * scripts/verify.mjs — ko/en 실렌더 검증 (완료 기준: 브리프 §스택&검증)
 * 사용: node scripts/verify.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";

const BASE = process.argv[2] ?? "http://localhost:4123";
const OUT = "test-results";

const checks = [];
function check(name, ok, detail = "") {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
}

const browser = await chromium.launch();

for (const [locale, path, expectLang, expectH1, storePrefix, stale] of [
  ["ko", "/", "ko", "뛰고 찍기까지", "https://apps.apple.com/kr/", ["출시 준비", "사전 등록", "출시하면", "베타"]],
  ["en", "/en", "en", "Run and shoot", "https://apps.apple.com/us/", ["launching soon", "early access", "waitlist", "beta"]],
]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const lang = await page.evaluate(() => document.documentElement.lang);
  check(`${locale}: <html lang>`, lang === expectLang, lang);

  const h1 = await page.locator("h1").first().textContent();
  check(`${locale}: h1`, (h1 ?? "").includes(expectH1), (h1 ?? "").trim());

  /* App Store CTA: Nav·히어로·최종 3개, 로케일에 맞는 스토어(kr/us) — 중앙 반복 없음 */
  const storeLinks = await page.locator(`a[href^="${storePrefix}"]`).count();
  check(`${locale}: App Store 링크 3개 (${storePrefix})`, storeLinks === 3, String(storeLinks));
  const otherStore = await page
    .locator('a[href^="https://apps.apple.com/"]')
    .evaluateAll((els, prefix) => els.filter((a) => !a.href.startsWith(prefix)).length, storePrefix);
  check(`${locale}: 다른 로케일 스토어 링크 없음`, otherStore === 0, String(otherStore));

  /* 출시 전 문구 잔존 금지 — 닫힌 <details>(FAQ 답변)까지 보려면 innerText가 아니라 textContent */
  const bodyText = ((await page.locator("body").textContent()) ?? "").toLowerCase();
  const leftovers = stale.filter((w) => bodyText.includes(w.toLowerCase()));
  check(`${locale}: 출시 전 문구 없음`, leftovers.length === 0, leftovers.join(", "));

  /* 앱 화면은 실제 캡처(webp) — 히어로 1장 + 화면 섹션 4장 */
  /* next/image가 src를 /_next/image?url=%2Fmedia%2F… 로 인코딩하므로 디코드 후 매칭 */
  const shots = await page
    .locator("img")
    .evaluateAll(
      (els, needle) =>
        els.filter((img) => decodeURIComponent(img.getAttribute("src") ?? "").includes(needle)).length,
      `/media/app/${locale}/`
    );
  check(`${locale}: 앱 캡처 5장 (${locale} 로케일)`, shots === 5, String(shots));

  /* FAQ 4문항 — 연동·사진 한 장·사진/얼굴 처리·기기 (09-06 토스식 리뉴얼) */
  const faqItems = await page.locator("details.faq-item").count();
  check(`${locale}: FAQ 4문항`, faqItems === 4, String(faqItems));

  /* Reveal(IntersectionObserver)·lazy 이미지 발화를 위해 실제 스크롤 후 캡처 */
  await page.evaluate(async () => {
    /* html { scroll-behavior: smooth } 우회 — instant로 전 구간 통과 */
    const step = window.innerHeight * 0.6;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${OUT}/${locale}-full.png`, fullPage: true });
  await page.screenshot({ path: `${OUT}/${locale}-hero.png` });
  await page.close();

  /* 모바일(390px — iPhone 12 기준선) */
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await mobile.goto(BASE + path, { waitUntil: "networkidle" });
  await mobile.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await mobile.waitForTimeout(1200);
  const hasHScroll = await mobile.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  check(`${locale}: 모바일 가로 스크롤 없음`, !hasHScroll, String(hasHScroll));
  await mobile.screenshot({ path: `${OUT}/${locale}-mobile-hero.png` });
  await mobile.screenshot({
    path: `${OUT}/${locale}-mobile-full.png`,
    fullPage: true,
  });
  await mobile.close();
}

/* OG 이미지: 빌드 산출 라우트가 해시 접미사를 갖는 경우가 있어 HTML의 og:image를 따라간다 */
for (const [locale, path] of [
  ["ko", "/"],
  ["en", "/en"],
]) {
  const page = await browser.newPage();
  await page.goto(BASE + path);
  const ogUrl = await page
    .locator('meta[property="og:image"]')
    .first()
    .getAttribute("content");
  check(`${locale}: og:image 메타`, Boolean(ogUrl), ogUrl ?? "(없음)");
  if (ogUrl) {
    const abs = ogUrl.startsWith("http")
      ? ogUrl.replace(/^https?:\/\/[^/]+/, BASE)
      : BASE + ogUrl;
    const res = await page.request.get(abs);
    const ct = res.headers()["content-type"] ?? "";
    check(
      `${locale}: og:image 렌더`,
      res.ok() && ct.includes("image/png"),
      `${res.status()} ${ct}`
    );
    if (res.ok()) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(`${OUT}/og-${locale}.png`, await res.body());
    }
  }
  await page.close();
}

await browser.close();

const failed = checks.filter((c) => !c.ok);
console.log(
  `\n${checks.length - failed.length}/${checks.length} checks passed`
);
process.exit(failed.length ? 1 : 0);
