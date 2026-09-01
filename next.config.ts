import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 표준 명칭은 llms.txt(llmstxt.org). 이슈 rungle#981이 부른 이름 llm.txt도 같은 본문으로 응답한다.
  async rewrites() {
    return [{ source: "/llm.txt", destination: "/llms.txt" }];
  },
};

export default nextConfig;
