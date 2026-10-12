import localFont from "next/font/local";

export const notoSans = localFont({
  src: [
    { path: "../../public/fonts/NotoSansKR-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/NotoSansKR-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-noto", display: "swap", preload: true,
});

export const bodoni = localFont({ src: "../../public/fonts/BodoniModa-MediumItalic.woff2", weight: "500", style: "normal", variable: "--font-bodoni", display: "swap", preload: true });

export const anton = localFont({ src: "../../public/fonts/Anton-Regular.woff2", weight: "400", style: "normal", variable: "--font-anton", display: "swap", preload: true });
