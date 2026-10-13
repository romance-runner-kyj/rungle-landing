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
  ["ko", "/", "ko", "달린 기록을", "https://apps.apple.com/app/apple-store/id6795858744?pt=129210758&ct=landing_ko&mt=8", ["출시 준비", "사전 등록", "출시하면", "베타", "계정 없이"]],
  ["en", "/en", "en", "Run stats", "https://apps.apple.com/app/apple-store/id6795858744?pt=129210758&ct=landing_en&mt=8", ["launching soon", "early access", "waitlist", "beta", "no account"]],
]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "light" });
  const pixelRequests = [];
  /* Meta에 실제 PageView를 보내지 않고 Pixel 스크립트 로드 시도만 확인한다 */
  await page.route("https://connect.facebook.net/**", async (route) => {
    pixelRequests.push(route.request().url());
    await route.abort();
  });
  await page.route("https://www.facebook.com/tr**", async (route) => {
    pixelRequests.push(route.request().url());
    await route.abort();
  });
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  check(
    `${locale}: Meta Pixel fbevents.js 로드 시도`,
    pixelRequests.some((url) => url.includes("/fbevents.js")),
    pixelRequests.join(", ")
  );

  const lang = await page.evaluate(() => document.documentElement.lang);
  check(`${locale}: <html lang>`, lang === expectLang, lang);

  const h1 = await page.locator("h1").first().textContent();
  check(`${locale}: h1`, (h1 ?? "").includes(expectH1), (h1 ?? "").trim());

  /* App Store CTA: Nav·히어로·최종 3개, 로케일에 맞는 캠페인 링크(ct=landing_ko/landing_en) — 중앙 반복 없음 */
  const storeLinks = await page.locator(`a[href^="${storePrefix}"]`).count();
  check(`${locale}: App Store 링크 3개 (${storePrefix})`, storeLinks === 3, String(storeLinks));
  const otherStore = await page
    .locator('a[href^="https://apps.apple.com/"]')
    .evaluateAll((els, prefix) => els.filter((a) => !a.href.startsWith(prefix)).length, storePrefix);
  check(`${locale}: 다른 로케일 스토어 링크 없음`, otherStore === 0, String(otherStore));

  /* 출시 전 문구·이전 계정 안내 잔존 금지 — 닫힌 <details>(FAQ 답변)까지 보려면 innerText가 아니라 textContent */
  const bodyText = ((await page.locator("body").textContent()) ?? "").toLowerCase();
  const leftovers = stale.filter((w) => bodyText.includes(w.toLowerCase()));
  check(`${locale}: 출시 전 문구·이전 계정 안내 없음`, leftovers.length === 0, leftovers.join(", "));

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

  /* FAQ 4문항 — 연동·사진 한 장·사진/얼굴 처리·기기와 로그인 */
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

  /* 스크롤 후 캡처가 실제로 디코딩됐는지 — 파일이 없으면 FAIL */
  const shotsLoaded = await page.locator("img").evaluateAll(
    (els, needle) => {
      const mine = els.filter((img) => decodeURIComponent(img.getAttribute("src") ?? "").includes(needle));
      return { total: mine.length, loaded: mine.filter((img) => img.complete && img.naturalWidth > 0).length };
    },
    `/media/app/${locale}/`
  );
  check(
    `${locale}: 앱 캡처 로드 완료 5장`,
    shotsLoaded.total === 5 && shotsLoaded.loaded === shotsLoaded.total,
    `${shotsLoaded.loaded}/${shotsLoaded.total}`
  );
  await page.screenshot({ path: `${OUT}/${locale}-full.png`, fullPage: true });
  await page.screenshot({ path: `${OUT}/${locale}-hero.png` });
  await page.close();

  /* 모바일(390px — iPhone 12 기준선) */
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
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

/* ko 다크 — 같은 토큰과 picture 분기를 데스크톱에서 확인한다 */
const dark = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  colorScheme: "dark",
});
await dark.route("https://connect.facebook.net/**", (route) => route.abort());
await dark.route("https://www.facebook.com/tr**", (route) => route.abort());
await dark.goto(BASE + "/", { waitUntil: "networkidle" });
const darkBackground = await dark.evaluate(
  () => getComputedStyle(document.body).backgroundColor
);
check("ko: 다크 body 배경", darkBackground === "rgb(17, 17, 17)", darkBackground);

/* lazy 이미지도 currentSrc를 선택하도록 전체 페이지를 먼저 스크롤한다 */
await dark.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 160));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
});
await dark.waitForTimeout(1600);
/* URL 선택과 실제 디코딩을 함께 본다 — 파일이 없으면 FAIL */
const darkShots = await dark.locator("img").evaluateAll(
  (els) =>
    els.filter(
      (i) => decodeURIComponent(i.currentSrc).includes("-dark.webp") && i.complete && i.naturalWidth > 0
    ).length
);
check("ko: 다크 앱 캡처 5장", darkShots === 5, String(darkShots));
await dark.screenshot({ path: `${OUT}/ko-dark-full.png`, fullPage: true });
await dark.close();

const darkMobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  colorScheme: "dark",
});
await darkMobile.route("https://connect.facebook.net/**", (route) => route.abort());
await darkMobile.route("https://www.facebook.com/tr**", (route) => route.abort());
await darkMobile.goto(BASE + "/", { waitUntil: "networkidle" });
const darkHasHScroll = await darkMobile.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth
);
check("ko: 다크 모바일 가로 스크롤 없음", !darkHasHScroll, String(darkHasHScroll));
await darkMobile.close();

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
