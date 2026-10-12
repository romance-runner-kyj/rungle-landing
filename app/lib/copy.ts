/**
 * app/lib/copy.ts — 카피 SSOT (ko 정본 → en 번역)
 * ─────────────────────────────────────────────────────────
 * 스타일: 토스(toss.im) 랜딩 문법 — 히어로는 짧은 구 3개, 섹션은 2줄 헤드라인(마침표 없음)
 * + 2줄 설명(해요체, 상황 → 결과), 화면 하나에 메시지 하나. 결정 2026-09-06(B안 다크 유지).
 *
 * 진실성 가드:
 *  - 출시된 제품 — 앱에 없는 기능을 주장하지 않는다. 화면은 App Store 판넬
 *    원본 캡처(public/media/app)만 쓰고 CSS로 앱을 재현하지 않는다.
 *  - 허위 소셜 프루프 금지 — 정성적 표현만. 가격·구독·무료 언급 금지(정책 미확정).
 *  - 프라이버시 표현은 스토어 설명 범위까지만 — 사진에 기록을 얹는 편집은 기기 안 처리,
 *    AI 베스트컷·AI 템플릿은 사진·영상을 서버로 보내고 처리 뒤 삭제, 로그인하고 백업을 켜면
 *    서버 보관(v2.0.0 스토어 설명 기준). 얼굴 관련 카피는 "인식만, 만들지 않는다"까지만.
 *  - 각 screen 카피는 그 캡처에 실제 보이는 것(버튼·필터·트랙)과 맞춘다.
 */
import type { Locale } from "./locales";
import type { AppScreen } from "../components/PhoneMockup";

type TwoLines = [string, string];

export type Copy = {
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  nav: {
    cta: string;
    langToggle: string; // 반대 언어 라벨
    langToggleAria: string;
  };
  hero: {
    badge: string;
    lines: [string, string, string]; // 3구, 마지막 구는 앰버
    sub: TwoLines;
  };
  cta: {
    label: string; // App Store 이동 버튼 (히어로·최종)
    microcopy: string; // 리스크 제거 마이크로카피 — 스토어 설명에 있는 사실만
  };
  screens: {
    key: AppScreen;
    kicker: string;
    headline: TwoLines;
    desc: TwoLines;
  }[];
  principles: {
    headline: TwoLines;
    items: { title: string; desc: string }[];
  };
  trackers: {
    headline: TwoLines;
    desc: TwoLines;
    names: string[];
    note: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    headline: TwoLines;
    sub: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
};

export const copy: Record<Locale, Copy> = {
  /* ─────────────────────────── KO (정본) ─────────────────────────── */
  ko: {
    meta: {
      title: "rungle(런글) — 러닝 기록 오버레이 사진과 러닝 릴스, 뛰고 찍으면 바로",
      description:
        "쓰던 러닝 앱의 기록을 애플 건강으로 불러와, 그때 찍은 사진에서 잘 나온 컷을 골라 거리·페이스·시간을 얹은 러닝 기록 오버레이 사진과 러닝 릴스 초안을 만들어요. 로그인 없이 시작, iOS App Store에서.",
      ogImageAlt: "rungle — 뛰고 찍기까지, 나머지는 런글이",
    },
    nav: {
      cta: "앱 받기",
      langToggle: "EN",
      langToggleAria: "Switch to English",
    },
    hero: {
      badge: "iOS · App Store 출시",
      lines: ["뛰고 찍기까지", "나머지는", "런글이"],
      sub: [
        "러닝이 끝난 벤치에서 기록 오버레이 사진과 릴스 초안이 나와요.",
        "편집에 쓰던 시간은 다음 러닝에 쓰면 돼요.",
      ],
    },
    cta: {
      label: "App Store에서 받기",
      microcopy: "iOS · 로그인 없이 시작해요",
    },
    screens: [
      {
        key: "pathchoice",
        kicker: "기록에서 시작하기",
        headline: ["러닝 하나 고르면", "따라오는 그날 사진"],
        desc: [
          "사진첩을 뒤질 필요 없이, 기록과 그때 찍은 사진이 모여요.",
          "릴스를 만들지, 사진에 기록만 넣을지 고르면 돼요.",
        ],
      },
      {
        key: "bestcut",
        kicker: "추천 사진 고르기",
        headline: ["백 장을 넘기던 일은", "이제 고르는 일로"],
        desc: [
          "AI가 사진 속 장면을 보고 올릴 만한 컷을 추천해요.",
          "인물·배경으로 나눠 보고, 올릴 컷은 내가 골라요.",
        ],
      },
      {
        key: "editor",
        kicker: "초안 다듬기",
        headline: ["초안은 이미 있으니", "손보는 건 잠깐"],
        desc: [
          "빈 타임라인 대신, 기록이 얹힌 짧은 초안에서 시작해요.",
          "컷을 바꾸고, 잘라내고, 문구를 얹는 정도면 충분해요.",
        ],
      },
      {
        key: "share",
        kicker: "인스타그램에 공유하기",
        headline: ["오늘 달린 숫자 그대로", "올리면 끝"],
        desc: [
          "캡처를 오려 붙이지 않아도 거리·페이스·시간이 얹혀 있어요.",
          "인스타그램에 올리거나, 저장하거나, 다른 앱으로 보내요.",
        ],
      },
    ],
    principles: {
      headline: ["하지 않기로 한 것도", "분명하게"],
      items: [
        {
          title: "얼굴은 알아보기만",
          desc: "잘 나온 컷을 고르려고 인식할 뿐, 만들거나 바꾸거나 보정하지 않아요.",
        },
        {
          title: "AI에 보낸 사진은 처리 뒤 지워요",
          desc: "사진에 기록을 얹는 편집은 아이폰 안에서 해요. AI 베스트컷·AI 템플릿에 보낸 사진·영상은 작업이 끝나면 지워요. 로그인하고 프로젝트 백업을 켜면 편집 작업과 사진은 서버에 보관해요.",
        },
        {
          title: "마무리는 결제창·광고 없이",
          desc: "저장하고 공유하는 순간을 막아서지 않아요.",
        },
      ],
    },
    trackers: {
      headline: ["측정은 쓰던 앱이", "런글은 그다음부터"],
      desc: [
        "다시 측정하거나 앱을 갈아탈 일은 없어요.",
        "애플 건강에 남은 러닝 기록을 그대로 불러와요.",
      ],
      names: ["Strava", "Nike Run Club", "Garmin", "Apple Watch"],
      note: "애플 건강에 러닝 기록을 남기는 앱이면 어떤 앱이든 돼요.",
    },
    faq: {
      title: "자주 묻는 질문",
      items: [
        {
          q: "어떤 러닝 앱과 같이 쓸 수 있나요?",
          a: "애플 건강(HealthKit)에 러닝 기록을 남기는 앱이면 돼요. Strava, Nike Run Club, Garmin, Apple Watch 모두 애플 건강을 거쳐 들어와요. 애플 건강에 기록이 없으면 러닝 앱의 기록 화면을 캡처해 넣어도 거리·페이스·시간을 읽어 오고, 읽은 값은 내가 확인하고 고칠 수 있어요.",
        },
        {
          q: "릴스 말고 사진 한 장만 올리고 싶어요.",
          a: "홈 최근 러닝에서 [사진 편집하기]를 누르면 돼요. 사진 한 장에 거리·페이스·시간을 얹어 저장하거나 인스타그램으로 공유해요. 로그인 없이도 돼요.",
        },
        {
          q: "제 사진과 얼굴은 어떻게 다뤄지나요?",
          a: "사진에 기록을 얹거나 직접 편집할 땐 아이폰 안에서 처리해요. AI 베스트컷과 AI 템플릿은 필요한 사진·영상을 서버로 보내고, 작업이 끝나면 지워요. 로그인하고 프로젝트 백업을 켜면 편집 작업과 관련 미디어가 서버에 보관돼요. 얼굴은 만들거나 바꾸거나 보정하지 않아요. 건강 데이터는 기록을 보여 주는 데 쓰고, 로그인하면 러닝 기록도 계정에 저장돼요.",
        },
        {
          q: "어떤 기기에서 쓸 수 있나요?",
          a: "iOS 앱이에요. 로그인 없이 시작해 사진에 기록을 얹을 수 있고, AI 베스트컷·AI 템플릿·프로젝트 저장과 백업·캡처로 기록 추가에는 로그인이 필요해요. 안드로이드 버전은 없어요.",
        },
      ],
    },
    finalCta: {
      headline: ["오늘 뛴 건", "오늘 올리기"],
      sub: "다음 러닝이 끝나는 자리에서 바로 만들 수 있어요.",
    },
    footer: {
      tagline: "러닝 끝나면, 릴스가 나온다",
      copyright: "© 2026 rungle",
    },
  },

  /* ─────────────────────────── EN (번역) ─────────────────────────── */
  en: {
    meta: {
      title: "rungle — Running stats overlays and run Reels, right after the run",
      description:
        "Pulls your runs from Apple Health, picks the best shots from that day and drafts a running stats overlay photo or run Reel for Instagram. Start without signing in. iOS.",
      ogImageAlt: "rungle — Run and shoot, leave the rest to rungle",
    },
    nav: {
      cta: "Get the app",
      langToggle: "KO",
      langToggleAria: "한국어로 전환",
    },
    hero: {
      badge: "iOS · Now on the App Store",
      lines: ["Run and shoot", "leave the rest", "to rungle"],
      sub: [
        "Stats-overlay photo and Reel draft, done on the bench.",
        "The time you spent editing goes back to running.",
      ],
    },
    cta: {
      label: "Download on the App Store",
      microcopy: "iOS · Start without signing in",
    },
    screens: [
      {
        key: "pathchoice",
        kicker: "Start from a run",
        headline: ["Pick a run,", "its photos follow"],
        desc: [
          "Skip the camera roll. The run's stats and photos come together.",
          "Then choose: make a Reel, or stamp the stats on a photo.",
        ],
      },
      {
        key: "bestcut",
        kicker: "Suggested photos",
        headline: ["From a hundred shots", "to the keepers"],
        desc: [
          "AI looks at what's in each photo and suggests the ones worth posting.",
          "Filter by people or scenery. The final pick is yours.",
        ],
      },
      {
        key: "editor",
        kicker: "Polish the draft",
        headline: ["Draft already made,", "polish takes a minute"],
        desc: [
          "Start from a short draft, stats on, not a blank timeline.",
          "Swap a cut, trim, drop in some text. That's usually enough.",
        ],
      },
      {
        key: "share",
        kicker: "Share to Instagram",
        headline: ["Stats already on it,", "post and done"],
        desc: [
          "No screenshot cropping: distance, pace and time are on it.",
          "Post to Instagram, save it, or send it to another app.",
        ],
      },
    ],
    principles: {
      headline: ["What we don't do,", "stated plainly"],
      items: [
        {
          title: "Faces are only detected",
          desc: "Only to judge which shot is sharpest. Never generated, altered or retouched.",
        },
        {
          title: "AI inputs are deleted after processing",
          desc: "Stamping stats on a photo happens on your iPhone. Photos and videos sent for AI best cuts or AI templates are deleted when the job ends. With sign-in and project backup on, your edits and media are stored on the server.",
        },
        {
          title: "No paywall at the finish",
          desc: "Saving and sharing are never blocked by a paywall or an ad.",
        },
      ],
    },
    trackers: {
      headline: ["Keep your tracker,", "rungle does the rest"],
      desc: [
        "No re-measuring, no switching apps.",
        "rungle reads the runs already in Apple Health.",
      ],
      names: ["Strava", "Nike Run Club", "Garmin", "Apple Watch"],
      note: "Any app that writes runs to Apple Health works.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Which running apps does it work with?",
          a: "Any app that writes runs to Apple Health (HealthKit). Strava, Nike Run Club, Garmin and Apple Watch all sync through it. No run in Apple Health? Drop in a screenshot of your running app's summary and rungle reads the distance, pace and time. You can check and correct the values before they're used.",
        },
        {
          q: "I just want to post one photo, not a Reel.",
          a: "Tap [Edit a photo] on your latest run on Home. It puts distance, pace and time on a single photo for you to save or share to Instagram. No sign-in needed.",
        },
        {
          q: "How are my photos and my face handled?",
          a: "Stamping stats on a photo and editing it yourself happen on your iPhone. AI best cuts and AI templates send the photos and videos they need to our server and delete them when the job ends. With sign-in and project backup on, your edits and related media are stored on the server. Faces are never generated, altered or retouched. Health data is used to display your stats, and once you sign in your runs are also saved to your account.",
        },
        {
          q: "What devices does it run on?",
          a: "rungle is an iOS app. You can start without signing in and stamp stats on your photos. AI best cuts, AI templates, saving and backing up projects, and adding runs from screenshots need sign-in. There's no Android version.",
        },
      ],
    },
    finalCta: {
      headline: ["Today's run,", "posted today"],
      sub: "Make it on the spot, right where your next run ends.",
    },
    footer: {
      tagline: "Your run ends, your Reel begins",
      copyright: "© 2026 rungle",
    },
  },
};
