/**
 * app/lib/copy.ts — 카피 SSOT (ko 정본 → en 번역)
 * ─────────────────────────────────────────────────────────
 * 진실성 가드 (개발 브리프):
 *  - 출시 전 제품 — 존재하지 않는 기능을 주장하지 않는다.
 *  - 가상 대기자 수 등 허위 소셜 프루프 금지 — 정성적 표현만.
 *  - "온디바이스 분석" 주장 금지 — PRD v2.1(07-02)에서 셀렉은 서버 수행으로 변경됨.
 *    얼굴 관련 카피는 "인식만, 만들지 않는다"까지만. (충돌 보고 완료)
 *
 * 근거:
 *  - 히어로 카피 공식: Submagic "[입력]에서 [결과물]까지 + 자동화" (리서치 HIGH)
 *  - 톤: PRD 한 줄 비전 "뛰고 찍기만 해라…" 번안
 *  - 러너 페인 수치: PRD §2 실측 인터뷰·도그푸딩 (릴스 1개 30분, 사진 100장 등)
 */
import type { Locale } from "./locales";

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
    headline1: string;
    headline2: string; // 앰버 하이라이트 라인
    sub: string;
  };
  waitlist: {
    placeholder: string;
    submit: string;
    submitting: string;
    done: string;
    error: string;
    invalidEmail: string;
    microcopy: string; // 리스크 제거 마이크로카피 (Runna 패턴)
  };
  value: {
    title: string;
    body: string;
  };
  pain: {
    title: string;
    sub: string;
    cards: { stat: string; label: string; desc: string }[];
  };
  features: {
    title: string;
    cards: { name: string; title: string; desc: string }[];
    faceGuard: string;
  };
  bestcut: {
    title: string;
    sub: string;
    aiBadge: string;
    cards: { rank: number | null; tags: string[] }[];
    note: string;
  };
  steps: {
    title: string;
    sub: string;
    items: { no: string; title: string; desc: string }[];
  };
  trackers: {
    title: string;
    body: string;
    names: string[];
    note: string;
  };
  emotive: {
    title: string;
    body: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    title: string;
    sub: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  mockup: {
    sessionTitle: string;
    sessionMeta: string;
    aiBadge: string;
    reasonTags: string[];
    draftLabel: string;
    shareButton: string;
  };
};

export const copy: Record<Locale, Copy> = {
  /* ─────────────────────────── KO (정본) ─────────────────────────── */
  ko: {
    meta: {
      title: "rungle — 러닝 기록 오버레이로 인증 릴스 자동 생성",
      description:
        "러닝 기록 오버레이를 입힌 러닝 인증 릴스, 자동으로. 이미 쓰는 러닝 앱의 기록을 불러와 찍어온 사진·영상에서 베스트컷을 골라 기록 오버레이 사진과 릴스 초안까지 만들어 드려요. 마지막 선택은 당신이 합니다. iOS 출시 소식을 가장 먼저 받아보세요.",
      ogImageAlt: "rungle — 러닝 기록 오버레이로 인증 릴스 자동 생성",
    },
    nav: {
      cta: "사전 등록",
      langToggle: "EN",
      langToggleAria: "Switch to English",
    },
    hero: {
      badge: "iOS · 출시 준비 중",
      headline1: "러닝 기록에서",
      headline2: "인증 릴스까지, 자동으로",
      sub: "뛰고 찍기만 하세요. 베스트컷 셀렉, 러닝 기록 사진 자동 생성, 릴스 초안까지 rungle가 합니다. 마지막 선택은 당신이 하고요.",
    },
    waitlist: {
      placeholder: "이메일 주소",
      submit: "출시 알림 받기",
      submitting: "등록 중",
      done: "등록 완료! 출시하면 가장 먼저 알려드릴게요.",
      error: "전송에 실패했어요. 잠시 후 다시 시도해 주세요.",
      invalidEmail: "유효한 이메일 주소를 입력해 주세요.",
      microcopy: "출시하면 가장 먼저 초대해 드려요 · 출시 소식 외에는 보내지 않아요",
    },
    value: {
      title: "매 러닝은 이미 한 편의 스토리예요",
      body: "스무 개의 셀카 영상, 십수 장의 사진, 그리고 오늘의 기록. 재료는 늘 충분했어요. 없었던 건 그걸 릴스로 이어 붙일 시간이죠. rungle는 러닝이 끝난 벤치에서, 오늘의 러닝을 올릴 수 있는 릴스로 만들어요.",
    },
    pain: {
      title: "러너들이 편집 앞에서 멈추는 이유",
      sub: "rungle를 만들기 전, 러너들을 직접 만나 들은 이야기예요.",
      cards: [
        {
          stat: "30분",
          label: "릴스 1개",
          desc: "유행 템플릿을 따라 만들면 릴스 하나에 30분. 당일에 못 올려 주말에 몰아 올리게 돼요.",
        },
        {
          stat: "100장 → 1장",
          label: "촬영 후 셀렉",
          desc: "사진 백여 장, 영상 십여 개에서 쓸 만한 컷 고르기 — 만난 러너 모두가 가장 오래 걸리는 일로 꼽았어요.",
        },
        {
          stat: "0개",
          label: "포기한 날",
          desc: "얼굴이 잘 나온 컷이 없는 날은 아예 올리기를 포기해요. 뛴 기록은 남았는데, 스토리는 사라지죠.",
        },
      ],
    },
    features: {
      title: "고르고, 입히고, 만드는 건 rungle가",
      cards: [
        {
          name: "베스트컷 셀렉",
          title: "AI가 먼저 골라드려요",
          desc: "얼굴이 잘 나오고, 흔들리지 않고, 러닝 구도가 좋은 컷을 AI가 후보로 추려요. 최종 선택은 언제나 당신 몫이에요.",
        },
        {
          name: "자동 릴스 초안",
          title: "템플릿 고르면 초안까지",
          desc: "유행 릴스 형식의 템플릿을 고르면, 선택한 컷에 거리·페이스·시간 오버레이를 입힌 릴스 초안이 자동으로 만들어져요. 다듬는 건 취향껏.",
        },
        {
          name: "가벼운 마무리",
          title: "완성 화면은 두 버튼으로 끝",
          desc: "갤러리 저장, 인스타그램 공유. 마지막 순간에 결제창이나 광고가 끼어들지 않아요.",
        },
      ],
      faceGuard:
        "얼굴은 건드리지 않아요 — AI는 잘 나온 컷을 고르는 데만 쓰고, 얼굴을 만들거나 바꾸지 않아요.",
    },
    bestcut: {
      title: "백 장 중에 쓸 컷, 먼저 추려드려요",
      sub: "찍어온 사진·영상에서 얼굴·흔들림·구도를 보고 후보를 순서대로 보여드려요. 고르는 건 당신이에요.",
      aiBadge: "AI 추천",
      cards: [
        { rank: 1, tags: ["얼굴 또렷", "구도 좋음"] },
        { rank: 2, tags: ["빛 좋음"] },
        { rank: 3, tags: ["안정 구간"] },
        { rank: null, tags: ["후보 밖 — 전체에서 직접"] },
      ],
      note: "자동 추천에는 항상 AI 추천 배지가 붙어요. 후보가 마음에 안 들면 전체 미디어에서 직접 골라도 돼요.",
    },
    steps: {
      title: "세 걸음이면 끝나요",
      sub: "러닝이 끝난 자리에서 벤치에서 일어나기 전에.",
      items: [
        {
          no: "01",
          title: "기록 연동",
          desc: "이미 쓰는 러닝 앱의 기록을 애플 건강(HealthKit)으로 불러와요. 다시 측정할 필요 없어요.",
        },
        {
          no: "02",
          title: "AI 편집",
          desc: "러닝 시간대의 사진·영상이 자동으로 모이고, 베스트컷 후보와 릴스 초안이 만들어져요.",
        },
        {
          no: "03",
          title: "릴스 공유",
          desc: "마음에 드는 초안을 골라 다듬고, 인스타그램으로 바로 공유해요.",
        },
      ],
    },
    trackers: {
      title: "쓰던 앱, 그대로 쓰세요",
      body: "측정은 이미 잘하고 있는 앱에게. rungle는 애플 건강(HealthKit)에 모인 러닝 기록을 불러올 뿐, 새 측정 앱을 강요하지 않아요.",
      names: ["Strava", "Nike Run Club", "Garmin", "Apple Watch"],
      note: "애플 건강에 러닝 기록을 남기는 앱이라면 어떤 앱이든.",
    },
    emotive: {
      title: "다음 러닝이 기다려지게",
      body: "올린 릴스에 달리는 반응이 다음 러닝의 연료가 돼요. 기록하고, 올리고, 다시 달리는 루프 — rungle는 그 루프가 끊기지 않게 편집이라는 마찰을 치워요.",
    },
    faq: {
      title: "자주 묻는 질문",
      items: [
        {
          q: "언제 출시하나요?",
          a: "iOS 클로즈 베타를 먼저 진행하고 공개 출시로 이어가요. 사전 등록하시면 베타부터 가장 먼저 초대해 드려요.",
        },
        {
          q: "어떤 러닝 앱과 연동되나요?",
          a: "애플 건강(HealthKit)에 러닝 기록을 남기는 앱이면 돼요. Strava, Nike Run Club, Garmin, Apple Watch 모두 HealthKit 동기화로 불러와요. 앱에서 러닝을 다시 측정할 필요는 없어요.",
        },
        {
          q: "AI가 얼굴을 보정하거나 바꾸나요?",
          a: "아니요. 얼굴은 잘 나온 컷을 고르는 데만 인식하고, 만들거나 바꾸거나 보정하지 않아요. 최종 선택도 항상 사람이 해요.",
        },
        {
          q: "제 사진은 어떻게 다뤄지나요?",
          a: "베스트컷 선별 목적으로만 쓰여요. 광고에 쓰지 않고, 다른 목적으로 수집하지 않아요. 건강 데이터도 기록 표시에만 사용해요.",
        },
      ],
    },
    finalCta: {
      title: "가장 먼저 달려볼 사람?",
      sub: "출시하면 이메일로 가장 먼저 초대해 드릴게요.",
    },
    footer: {
      tagline: "러닝 기록에서 인증 릴스까지, 자동으로",
      copyright: "© 2026 rungle",
    },
    mockup: {
      sessionTitle: "한강 새벽런",
      sessionMeta: "7월 2일 수 · 오전 6:12",
      aiBadge: "AI 추천",
      reasonTags: ["얼굴 또렷", "구도 좋음"],
      draftLabel: "릴스 초안",
      shareButton: "인스타그램 공유",
    },
  },

  /* ─────────────────────────── EN (번역) ─────────────────────────── */
  en: {
    meta: {
      title: "rungle — Auto-generate running stats overlays and run Reels",
      description:
        "Running stats overlays and Instagram run Reels, generated automatically. rungle pulls the runs you already track, picks the best shots from your photos and videos, and drafts a Reel with your stats overlaid. You make the final call. Be first to know when we launch on iOS.",
      ogImageAlt: "rungle — Auto-generate running stats overlays and run Reels",
    },
    nav: {
      cta: "Get early access",
      langToggle: "KO",
      langToggleAria: "한국어로 전환",
    },
    hero: {
      badge: "iOS · launching soon",
      headline1: "From your run",
      headline2: "to a Reel, automatically",
      sub: "Just run and shoot. rungle handles the culling, the stats overlay, and the Reel draft — you make the final call.",
    },
    waitlist: {
      placeholder: "Email address",
      submit: "Notify me at launch",
      submitting: "Submitting",
      done: "You're on the list! We'll email you first at launch.",
      error: "Something went wrong. Please try again in a moment.",
      invalidEmail: "Please enter a valid email address.",
      microcopy: "First invites at launch · launch news only, nothing else",
    },
    value: {
      title: "Every run is already a story",
      body: "Twenty selfie clips, a dozen photos, and today's stats. The raw material was always there — what was missing is the time to cut it into a Reel. rungle turns today's run into a post-ready Reel before you get up from the bench.",
    },
    pain: {
      title: "Why runners stall at editing",
      sub: "What runners told us before we built rungle.",
      cards: [
        {
          stat: "30 min",
          label: "per Reel",
          desc: "Following a trending template takes a solid 30 minutes per Reel. It doesn't go up that day — it piles up for the weekend.",
        },
        {
          stat: "100 → 1",
          label: "the culling",
          desc: "Picking usable shots out of a hundred photos and a dozen clips — every runner we met called it the slowest part.",
        },
        {
          stat: "0 posts",
          label: "the days you quit",
          desc: "No good face shot, no post. The run made it into the log — the story never did.",
        },
      ],
    },
    features: {
      title: "rungle does the picking, overlaying, drafting",
      cards: [
        {
          name: "Best-cut select",
          title: "AI picks candidates first",
          desc: "Sharp faces, steady frames, good running form — AI shortlists the best cuts. The final pick is always yours.",
        },
        {
          name: "Auto Reel draft",
          title: "Choose a template, get a draft",
          desc: "Pick a trending-style template and get a Reel draft with your distance, pace, and time overlaid on your chosen cuts. Polish it your way.",
        },
        {
          name: "A light finish",
          title: "Two buttons and you're done",
          desc: "Save to gallery, share to Instagram. No paywall or ads wedged into your last step.",
        },
      ],
      faceGuard:
        "Hands off your face — AI only helps pick your best shots. It never generates or alters faces.",
    },
    bestcut: {
      title: "The keepers out of a hundred shots, shortlisted first",
      sub: "rungle scans your photos and clips for faces, blur, and framing, then shows candidates in order. The pick is yours.",
      aiBadge: "AI pick",
      cards: [
        { rank: 1, tags: ["Sharp face", "Good framing"] },
        { rank: 2, tags: ["Great light"] },
        { rank: 3, tags: ["Steady segment"] },
        { rank: null, tags: ["Outside picks — browse all"] },
      ],
      note: "Automatic picks always carry the AI badge. Not feeling the candidates? Browse your full roll and choose directly.",
    },
    steps: {
      title: "Three steps, done",
      sub: "Right where your run ends — before you leave the bench.",
      items: [
        {
          no: "01",
          title: "Connect your runs",
          desc: "rungle pulls runs you already track via Apple Health (HealthKit). No re-measuring.",
        },
        {
          no: "02",
          title: "AI edits",
          desc: "Photos and videos from your run window gather automatically; best-cut candidates and a Reel draft follow.",
        },
        {
          no: "03",
          title: "Share the Reel",
          desc: "Pick the draft you like, polish it, and share straight to Instagram.",
        },
      ],
    },
    trackers: {
      title: "Keep the app you already run with",
      body: "Tracking stays with the app that's already good at it. rungle just reads your runs from Apple Health (HealthKit) — no new tracker required.",
      names: ["Strava", "Nike Run Club", "Garmin", "Apple Watch"],
      note: "Any app that writes runs to Apple Health works.",
    },
    emotive: {
      title: "Make the next run something to look forward to",
      body: "Reactions to your Reel fuel the next run. Log it, post it, run again — rungle clears the editing friction so the loop never breaks.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "When does it launch?",
          a: "We're running an iOS closed beta first, then opening up. Join the waitlist and you'll be invited first, starting with the beta.",
        },
        {
          q: "Which running apps does it work with?",
          a: "Any app that writes runs to Apple Health (HealthKit) — Strava, Nike Run Club, Garmin, and Apple Watch all sync through it. No re-measuring in our app.",
        },
        {
          q: "Does the AI retouch or alter faces?",
          a: "No. Faces are only recognized to pick your best shots — never generated, altered, or retouched. The final pick is always human.",
        },
        {
          q: "How are my photos handled?",
          a: "They're used only to select your best cuts. Never for ads, never collected for other purposes. Health data is used only to display your stats.",
        },
      ],
    },
    finalCta: {
      title: "Want to run it first?",
      sub: "We'll send first invites by email at launch.",
    },
    footer: {
      tagline: "From your run to a Reel, automatically",
      copyright: "© 2026 rungle",
    },
    mockup: {
      sessionTitle: "Han River dawn run",
      sessionMeta: "Wed Jul 2 · 6:12 AM",
      aiBadge: "AI pick",
      reasonTags: ["Sharp face", "Good framing"],
      draftLabel: "Reel draft",
      shareButton: "Share to Instagram",
    },
  },
};
