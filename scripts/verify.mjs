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

for (const [locale, path, expectLang, expectH1] of [
  ["ko", "/", "ko", "러닝 기록에서"],
  ["en", "/en", "en", "From your run"],
]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const lang = await page.evaluate(() => document.documentElement.lang);
  check(`${locale}: <html lang>`, lang === expectLang, lang);

  const h1 = await page.locator("h1").first().textContent();
  check(`${locale}: h1`, (h1 ?? "").includes(expectH1), (h1 ?? "").trim());

  const forms = await page.locator("form").count();
  check(`${locale}: waitlist 폼 2개`, forms === 2, String(forms));

  const emailInputs = await page.locator('input[type="email"]').count();
  check(`${locale}: 이메일 입력 2개`, emailInputs === 2, String(emailInputs));

  const honeypots = await page.locator('input[name="_gotcha"]').count();
  check(`${locale}: 허니팟`, honeypots === 2, String(honeypots));

  /* CTA는 처음(히어로 폼)·끝(최종 폼)·Nav 앵커 1개만 — 중앙 반복 제거 확인 */
  const ctaAnchors = await page.locator('a[href="#waitlist"]').count();
  check(`${locale}: #waitlist 앵커 = 1 (Nav만)`, ctaAnchors === 1, String(ctaAnchors));

  /* 07-03: 유료/안드로이드 문답 제거 결정으로 6 → 4 */
  const faqItems = await page.locator("details.faq-item").count();
  check(`${locale}: FAQ 4문항`, faqItems === 4, String(faqItems));

  const emailBg = await page
    .locator('input[type="email"]')
    .first()
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  check(
    `${locale}: 이메일 입력 흰 배경`,
    emailBg === "rgb(255, 255, 255)",
    emailBg
  );

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
