/**
 * app/(ko)/page.tsx — 한국어 랜딩 (URL: /)
 * 카피는 서버에서 dict 주입 — localStorage 없음, FOUC 0 (v2 검증 구조)
 */
import Landing from "../components/Landing";
import { copy } from "../lib/copy";

export default function KoPage() {
  return <Landing lang="ko" t={copy.ko} />;
}
