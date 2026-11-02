/**
 * app/lib/copy.ts — 카피 SSOT (ko 정본 → en 번역)
 * 2줄 헤드라인, 해요체 설명, 영문 대문자 키커.
 * 히어로 설명은 한 줄. 화면마다 메시지 하나, 캡처는 v2.1.0 실화면만 쓴다.
 *
 * 진실성 가드 (iOS v2.1.0):
 *  - 로그인 없이 시작해 사진에 기록을 얹을 수 있다. AI 베스트컷·AI 템플릿·
 *    프로젝트 저장과 백업·캡처로 기록 추가에는 로그인이 필요하다.
 *  - 사진에 기록을 얹거나 직접 편집할 때는 아이폰 안에서 처리한다.
 *    AI 베스트컷·AI 템플릿은 필요한 사진·영상을 서버로 보내고 처리 뒤 입력을 삭제한다.
 *  - 로그인하고 프로젝트 백업을 켜면 편집 작업과 관련 미디어는 서버에 보관한다.
 *    로그인하면 러닝 기록도 계정에 저장한다.
 *  - AI 베스트컷은 잘 나온 컷을 고르려고 얼굴을 평가할 뿐, 만들거나 바꾸거나 보정하지 않는다.
 *    정지컷 AI 템플릿(스파이더맨샷)은 얼굴과 몸을 다시 그릴 수 있다(처리방침과 맞춘다).
 *    누구인지 알아보는 처리는 하지 않는다.
 *  - 앱에 없는 기능·허위 소셜 프루프·속도 및 정확도 비교·가격·구독·무료는 쓰지 않는다.
 *    저장·공유 앞 결제창·광고가 없다는 문구는 Pro 결제가 열리면 즉시 수정한다.
 *  - 각 화면의 문장은 실캡처에 보이는 UI와 맞춘다. CSS로 앱 화면을 재현하지 않는다.
 */
import type { Locale } from "./locales";
import type { AppScreen } from "../components/PhoneMockup";

type TwoLines = [string, string];
export type Copy = {
  meta: { title: string; description: string; ogImageAlt: string };
  nav: { cta: string; langToggle: string; langToggleAria: string; themeToDark: string; themeToLight: string };
  hero: { label: string; lines: TwoLines; sub: string; tagline: string };
  cta: { label: string; microcopy: string };
  screens: { key: AppScreen; kicker: string; headline: TwoLines; desc: TwoLines; caption?: string }[];
  screenAlts: Record<AppScreen, string>;
  principles: { headline: TwoLines; items: { title: string; desc: string }[] };
  trackers: { headline: TwoLines; desc: TwoLines; names: string[]; note: string };
  faq: { title: string; items: { q: string; a: string }[] };
  finalCta: { tagline: string; headline: TwoLines; sub: string };
  footer: { tagline: string; copyright: string };
};
export const copy: Record<Locale, Copy> = {
  ko: {
    meta: {
      title: "rungle(런글) — 러닝 기록 오버레이 사진과 러닝 릴스, 달린 기록을 사진과 릴스로",
      description: "쓰던 러닝 앱의 기록을 애플 건강으로 불러와, 그날 찍은 사진에 거리·페이스·시간을 얹은 러닝 기록 오버레이 사진과 템플릿 릴스를 만들어요. 로그인 없이 시작, iOS App Store.",
      ogImageAlt: "rungle — 달린 기록을, 사진과 릴스로"
    },
    nav: {
      cta: "앱 받기",
      langToggle: "EN",
      langToggleAria: "Switch to English",
      themeToDark: "다크 모드로 전환",
      themeToLight: "라이트 모드로 전환"
    },
    hero: {
      label: "iOS · App Store",
      lines: [
        "달린 기록을,",
        "사진과 릴스로."
      ],
      sub: "쓰던 러닝 앱의 기록을 그대로 불러와 만들어요.",
      tagline: "Your run, reimagined."
    },
    cta: {
      label: "App Store에서 받기",
      microcopy: "iOS · 로그인 없이 시작해요"
    },
    screens: [
      {
        key: "home",
        kicker: "RUNNING JOURNAL",
        headline: [
          "달린 날들이,",
          "나만의 이야기로."
        ],
        desc: [
          "쓰던 러닝 앱의 기록이 애플 건강을 거쳐 홈에 모여요.",
          "최근 러닝에서 바로 사진을 편집하거나 릴스를 만들어요."
        ]
      },
      {
        key: "bestcut",
        kicker: "AI BEST CUT",
        headline: [
          "많이 찍어도,",
          "고르는 건 가볍게."
        ],
        desc: [
          "AI가 사진 속 장면을 보고 올릴 만한 컷을 추천해요.",
          "전체·인물·배경으로 나눠 보고, 마지막 한 장은 내가 골라요."
        ],
        caption: "로그인 뒤 쓸 수 있어요. 얼굴은 평가만 하고, 누구인지 알아보거나 만들거나 바꾸지 않아요."
      },
      {
        key: "photo",
        kicker: "PHOTO & RECORD",
        headline: [
          "사진 한 장에,",
          "오늘 달린 나."
        ],
        desc: [
          "거리, 페이스, 시간을 풍경 위에 얹어요.",
          "심플한 숫자부터 말풍선, 티켓까지 스타일을 고르고 위치와 크기를 맞춰요."
        ]
      },
      {
        key: "templates",
        kicker: "REEL TEMPLATES",
        headline: [
          "평범한 러닝도,",
          "색다른 릴스로."
        ],
        desc: [
          "마음에 드는 템플릿을 고르고 내 러닝 영상으로 만들어요.",
          "한 달 러닝을 한 편으로 잇는 월말정산도 있어요."
        ],
        caption: "컷편집·스파이더맨샷·웹슈터·월말정산은 AI 템플릿이라 로그인이 필요해요."
      }
    ],
    screenAlts: {
      share: "러닝 사진에 거리와 페이스를 얹은 결과물을 인스타그램으로 공유하거나 저장하는 런글 공유 화면",
      home: "최근 러닝의 사진과 거리, 페이스, 시간을 보여 주고 사진 편집과 릴스 만들기 버튼을 둔 런글 홈 화면",
      bestcut: "AI가 추천한 러닝 사진을 전체, 인물, 배경으로 나눠 보여 주는 런글 추천 사진 화면",
      photo: "벚꽃 풍경 사진에 거리와 페이스 오버레이를 얹은 런글 사진 편집 화면",
      templates: "자유 편집, 컷편집, km 분할 같은 릴스 템플릿을 고르는 런글 템플릿 선택 화면"
    },
    principles: {
      headline: [
        "하지 않는 것도,",
        "필요한 것도 분명하게."
      ],
      items: [
        {
          title: "누구인지 알아보지 않아요",
          desc: "AI 베스트컷은 잘 나온 컷을 고를 때 얼굴을 평가할 뿐, 만들거나 바꾸거나 보정하지 않아요. 스파이더맨샷처럼 정지컷을 만드는 AI 템플릿은 얼굴과 몸을 다시 그릴 수 있어요."
        },
        {
          title: "AI에 보낸 사진은 처리 뒤 지워요",
          desc: "사진에 기록을 얹는 편집은 아이폰 안에서 해요. AI 베스트컷·AI 템플릿에 보낸 사진·영상은 작업이 끝나면 지워요. 로그인하고 프로젝트 백업을 켜면 편집 작업과 사진은 서버에 보관해요."
        },
        {
          title: "마무리는 결제창·광고 없이",
          desc: "저장하고 공유하는 순간을 막아서지 않아요."
        }
      ]
    },
    trackers: {
      headline: [
        "측정은 쓰던 앱이",
        "런글은 그다음부터"
      ],
      desc: [
        "다시 측정하거나 앱을 갈아탈 일은 없어요.",
        "애플 건강에 남은 러닝 기록을 그대로 불러와요."
      ],
      names: [
        "Strava",
        "Nike Run Club",
        "Garmin",
        "Apple Watch"
      ],
      note: "애플 건강에 러닝 기록을 남기는 앱이면 어떤 앱이든 돼요. 기록이 없으면 러닝 앱 캡처 한 장으로도 시작해요."
    },
    faq: {
      title: "자주 묻는 질문",
      items: [
        {
          q: "러닝 기록 사진에 페이스 넣는 앱 있어요?",
          a: "런글(rungle)이 러닝 사진에 페이스, 거리, 시간을 얹는 iOS 앱이에요. 홈 최근 러닝에서 [사진 편집하기]를 누르고 사진을 고른 뒤, 오버레이 스타일과 위치, 크기를 맞춰요. [지표 변경]으로 평균 심박수, 칼로리, 고도 상승도 켤 수 있어요. 로그인 없이도 돼요."
        },
        {
          q: "러닝하면서 찍은 사진 중에 잘 나온 컷을 자동으로 골라 주는 앱 있어요?",
          a: "런글의 AI 베스트컷(앱 화면 이름 '추천 사진')이 러닝 사진을 살펴보고 올릴 만한 컷을 추천해요. 전체, 인물, 배경으로 나눠 보고 마지막 한 장은 직접 골라요. 연달아 찍은 똑같은 사진은 한 장만 추천해요. 로그인이 필요하고, AI에 보낸 사진은 작업이 끝나면 지워요."
        },
        {
          q: "스트라바(Strava) 기록을 인스타 스토리나 릴스로 올리는 방법 알려 주세요.",
          a: "Strava 앱 설정의 Health 연결에서 애플 건강으로 보내기를 켜면, Strava 기록이 애플 건강을 거쳐 런글 홈에 모여요. 사진에 기록을 얹거나 템플릿으로 릴스를 만든 뒤, 저장하거나 인스타그램으로 공유해 스토리나 릴스로 올려요."
        },
        {
          q: "나이키 런 클럽(NRC) 기록을 사진에 얹어서 공유하려면 어떤 앱을 써요?",
          a: "런글을 쓰면 돼요. NRC 기록은 애플 건강을 거쳐 런글로 들어와요. 건강 앱 오른쪽 위 프로필에서 개인정보 보호의 '앱'을 누르고 Nike Run Club을 골라 '모두 켜기'를 눌러 주세요. 그다음 런글에서 [사진 편집하기]로 사진에 기록을 얹고 저장하거나 인스타그램으로 공유해요."
        },
        {
          q: "애플워치 러닝 기록으로 인스타 릴스 만드는 법 알려 주세요.",
          a: "애플워치 운동 앱으로 달린 기록은 애플 건강에 저장돼요. 런글에 건강 권한을 허용하면 기록이 홈에 모이고, 최근 러닝에서 [릴스 만들기]를 눌러 템플릿을 골라요. 내 사진과 영상으로 초안을 만들어 다듬은 뒤, 저장하거나 인스타그램으로 공유해요."
        },
        {
          q: "어떤 러닝 앱과 같이 쓸 수 있나요?",
          a: "애플 건강(HealthKit)에 러닝 기록을 남기는 앱이면 돼요. Strava, Nike Run Club, Garmin, Apple Watch 모두 애플 건강을 거쳐 들어오고, 앱에 따라 애플 건강 연동을 먼저 켜야 해요. 기록이 없으면 러닝 앱 기록 화면 캡처를 넣어 거리·시간·페이스를 읽어 오고, 읽은 값은 눌러서 고칠 수 있어요. 캡처를 기록으로 저장하려면 로그인이 필요해요."
        },
        {
          q: "릴스 말고 사진 한 장만 올리고 싶어요.",
          a: "홈 최근 러닝에서 [사진 편집하기]를 누르면 돼요. 사진 한 장에 거리·페이스·시간을 얹어 저장하거나 인스타그램으로 공유해요. 로그인 없이도 돼요."
        },
        {
          q: "제 사진과 얼굴은 어떻게 다뤄지나요?",
          a: "사진에 기록을 얹거나 직접 편집할 땐 아이폰 안에서 처리해요. AI 베스트컷과 AI 템플릿은 필요한 사진·영상을 서버로 보내고, 작업이 끝나면 지워요. 로그인하고 프로젝트 백업을 켜면 편집 작업과 관련 미디어가 서버에 보관돼요. AI 베스트컷은 얼굴을 평가만 하고, 만들거나 바꾸거나 보정하지 않아요. 스파이더맨샷처럼 정지컷을 만드는 AI 템플릿은 얼굴과 몸을 다시 그릴 수 있어요. 누구인지 알아보는 처리는 하지 않아요. 건강 데이터는 기록을 보여 주는 데 쓰고, 로그인하면 러닝 기록도 계정에 저장돼요."
        },
        {
          q: "어떤 기기에서, 로그인은 꼭 해야 하나요?",
          a: "iOS 앱이에요. 로그인 없이 시작해 사진에 기록을 얹을 수 있고, AI 베스트컷·AI 템플릿·프로젝트 저장과 백업·캡처로 기록 추가에는 로그인(Apple·Google·카카오·네이버)이 필요해요. 안드로이드 버전은 없어요."
        }
      ]
    },
    finalCta: {
      tagline: "Every run, a story.",
      headline: [
        "오늘 뛴 건,",
        "오늘 올리기."
      ],
      sub: "쓰던 러닝 앱의 기록을 그대로 불러와 만들어요."
    },
    footer: {
      tagline: "달린 기록을, 사진과 릴스로.",
      copyright: "© 2026 rungle"
    }
  },
  en: {
    meta: {
      title: "rungle — Running stats overlays and run Reels",
      description: "Bring runs from your running app through Apple Health, add distance, pace and time to your photos, and make template reels. Start without signing in. iOS.",
      ogImageAlt: "rungle — Run stats, made into photos and reels"
    },
    nav: {
      cta: "Get the app",
      langToggle: "KO",
      langToggleAria: "한국어로 전환",
      themeToDark: "Switch to dark mode",
      themeToLight: "Switch to light mode"
    },
    hero: {
      label: "iOS · On the App Store",
      lines: [
        "Run stats,",
        "made into photos and reels."
      ],
      sub: "Runs come straight from the app you already use.",
      tagline: "Your run, reimagined."
    },
    cta: {
      label: "Download on the App Store",
      microcopy: "iOS · Start without signing in"
    },
    screens: [
      {
        key: "home",
        kicker: "RUNNING JOURNAL",
        headline: [
          "Every run.",
          "Part of your story."
        ],
        desc: [
          "Runs from the app you already use land on Home through Apple Health.",
          "Edit a photo or make a reel straight from your latest run."
        ]
      },
      {
        key: "bestcut",
        kicker: "AI BEST CUT",
        headline: [
          "More shots.",
          "Less choosing."
        ],
        desc: [
          "AI looks at what's in each photo and suggests the ones worth posting.",
          "Browse all, people or scenery. The final pick is yours."
        ],
        caption: "Requires sign-in. Faces are only scored, never identified, generated or altered."
      },
      {
        key: "photo",
        kicker: "PHOTO & RECORD",
        headline: [
          "Your photo.",
          "Your run."
        ],
        desc: [
          "Put distance, pace and time right on the scenery.",
          "Pick a style, from clean numbers to speech bubbles and tickets, then place and resize it."
        ]
      },
      {
        key: "templates",
        kicker: "REEL TEMPLATES",
        headline: [
          "A fresh take",
          "on every run."
        ],
        desc: [
          "Pick a template and make it with your own running videos.",
          "Monthly Recap stitches a whole month of runs into one reel."
        ],
        caption: "Cut Edit, Spider Shot, Web Shooter and Monthly Recap are AI templates and need sign-in."
      }
    ],
    screenAlts: {
      share: "rungle share screen for posting a running photo with distance and pace to Instagram or saving it",
      home: "rungle Home screen showing the latest run's photo, distance, pace and time, with buttons to edit a photo or make a reel",
      bestcut: "rungle Suggested photos screen showing AI-picked running photos, filtered by all, people or scenery",
      photo: "rungle photo editor showing a distance and pace overlay on a cherry blossom scene",
      templates: "rungle template screen for choosing a reel template such as manual editing, Cut Edit or km split"
    },
    principles: {
      headline: [
        "What we don't do,",
        "and what you'll need."
      ],
      items: [
        {
          title: "We never identify anyone",
          desc: "AI best cuts only score faces to pick your best shots, and never generate, alter or retouch them. AI templates that create a freeze frame, such as Spider Shot, may redraw faces and bodies."
        },
        {
          title: "AI inputs are deleted after processing",
          desc: "Stamping stats on a photo happens on your iPhone. Photos and videos sent for AI best cuts or AI templates are deleted when the job ends. With sign-in and project backup on, your edits and media are stored on the server."
        },
        {
          title: "No paywall at the finish",
          desc: "Saving and sharing are never blocked by a paywall or an ad."
        }
      ]
    },
    trackers: {
      headline: [
        "Keep your tracker,",
        "rungle does the rest"
      ],
      desc: [
        "No re-measuring, no switching apps.",
        "rungle reads the runs already in Apple Health."
      ],
      names: [
        "Strava",
        "Nike Run Club",
        "Garmin",
        "Apple Watch"
      ],
      note: "Any app that writes runs to Apple Health works. No run there? Start from a screenshot of your running app."
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Is there an app that adds pace to running photos?",
          a: "rungle is an iOS app that adds pace, distance and time to your running photos. Tap [Edit a photo] on your latest run on Home, pick a photo, then choose an overlay style and set its position and size. You can also turn on average heart rate, calories and elevation gain. You can do this without signing in."
        },
        {
          q: "Is there an app that automatically picks the best shots from photos taken during a run?",
          a: "rungle's AI best cut (the Suggested photos screen in the app) looks through your running photos and suggests the ones worth posting. Browse all, people or scenery, and make the final pick yourself. Identical photos taken back to back are suggested only once. It requires sign-in, and photos sent to AI are deleted when the job ends."
        },
        {
          q: "How do I turn Strava activities into Instagram Stories or Reels?",
          a: "In Strava settings, open Health under Manage Apps and Devices and turn on Send to Health. Your Strava activities then reach rungle's Home through Apple Health. Add the stats to a photo or make a reel from a template, then save it or share it to Instagram to post it as a Story or Reel."
        },
        {
          q: "Which app can put Nike Run Club stats on a photo?",
          a: "You can use rungle. NRC runs come to rungle through Apple Health. In the Health app, tap your profile at the top right, tap Apps under Privacy, choose Nike Run Club and tap Turn On All. Then tap [Edit a photo] in rungle to add the stats to a photo, and save it or share it to Instagram."
        },
        {
          q: "How do I make an Instagram Reel from Apple Watch runs?",
          a: "Runs recorded with the Apple Watch Workout app are saved to Apple Health. Allow Health access in rungle and they appear on Home. Tap [Make a reel] on your latest run, pick a template, make a draft with your own photos and videos, edit it, then save it or share it to Instagram."
        },
        {
          q: "Which running apps does it work with?",
          a: "Any app that writes runs to Apple Health (HealthKit). Strava, Nike Run Club, Garmin and Apple Watch all sync through Apple Health, and some apps need Apple Health sharing turned on first. If there is no run, add a screenshot of your running app's summary to read the distance, time and pace. Tap the values to correct them. Saving the screenshot as a run requires sign-in."
        },
        {
          q: "I just want to post one photo, not a Reel.",
          a: "Tap [Edit a photo] on your latest run on Home. Add distance, pace and time to a single photo, then save it or share it to Instagram. You can do this without signing in."
        },
        {
          q: "How are my photos and my face handled?",
          a: "Stamping stats on photos and editing them yourself happen on your iPhone. AI best cuts and AI templates send the photos and videos they need to the server and delete them when the job ends. With sign-in and project backup on, your edits and related media are stored on the server. AI best cuts only score faces, and never generate, alter or retouch them. AI templates that create a freeze frame, such as Spider Shot, may redraw faces and bodies. We never identify anyone. Health data is used to display your stats, and signing in also saves your runs to your account."
        },
        {
          q: "Which devices does it run on, and do I have to sign in?",
          a: "rungle is an iOS app. You can start without signing in and stamp stats on photos. AI best cuts, AI templates, project saving and backup, and adding runs from screenshots require sign-in with Apple, Google, Kakao or Naver. There is no Android version."
        }
      ]
    },
    finalCta: {
      tagline: "Every run, a story.",
      headline: [
        "Today's run,",
        "posted today."
      ],
      sub: "Runs come straight from the app you already use."
    },
    footer: {
      tagline: "Run stats, made into photos and reels.",
      copyright: "© 2026 rungle"
    }
  }
};
