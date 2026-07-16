/**
 * app/(en)/en/page.tsx — 영어 랜딩 (URL: /en)
 */
import Landing from "../../components/Landing";
import { copy } from "../../lib/copy";

export default function EnPage() {
  return <Landing lang="en" t={copy.en} />;
}
