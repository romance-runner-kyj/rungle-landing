# 랜딩 페이지 v2 개편 설계 — 앱 v2.0.0/v2.1.0 디자인 반영

- 작성일: 2026-10-10
- 상태: 초안(승인 전). 구현 계획은 승인 뒤에 따로 쓴다.
- 근거 저장소: 앱 `~/projects/rungle`(iOS v2.1.0 빌드 17, 2026-10-09 출시), 랜딩 `~/projects/rungle-landing`(v3.0.0, 1.x 디자인)

## 1. 왜 바꾸나

앱은 v2.0.0(2026-10-02)에서 화면을 전부 새로 그렸다. 1.x의 "크로노 앰버 + 암실" 다크 테마와 Pretendard를 버리고,
흰·검정 바탕의 "매거진" 언어(하늘색 포인트, Noto Sans KR·Bodoni Moda·Anton)로 바뀌었고 하단 탭 4개(홈·에디터·프로젝트·내 정보) 구조가 됐다.
랜딩은 아직 1.x 그대로다 — 앰버 CTA, 소문자 `rungle` 트랙 필 로고, 1.x 앱 캡처 4장(만들기·추천 사진·에디터·공유), 1.x 사실(계정 없이, 사진은 기기 안)에 기반한 카피.
그래서 지금 랜딩을 보고 앱을 받으면 다른 제품처럼 보이고, 카피 일부는 v2.1.0에서 사실이 아니다.

## 2. 앱 v2 디자인 언어 (랜딩이 따를 기준)

정본은 앱 코드다. 값은 전부 여기서 옮긴다.

| 항목 | 정본 파일 | 요지 |
|---|---|---|
| 색·서체·치수 토큰 | `ios/Rungle/DesignSystem/DS+V2Tokens.swift` (DESIGN.pen 01 보드와 1:1) | 라이트·다크 두 벌. 하늘색은 핵심 행동에만 |
| 로고 | `ios/Rungle/DesignSystem/V2/RungleBrandMark.swift` | 트랙 외곽선 173×86(선 13) + 러너 점(지름 25, 오른쪽 위) + 아래 `RUNGLE`(Anton 52, 자간 −1). 색은 text/primary(검정·흰), 앰버 없음 |
| 트랙 로딩 | `V2TrackOrbitLoading.swift` | 점만 1.4초에 한 바퀴. 트랙은 안 돈다. Reduce Motion이면 정지 |
| 버튼 | `V2ButtonStyle.swift` | 높이 52, 글자 15/500, 좌우 16, 모서리 8. 핵심 행동(primary)은 화면에 하나 |
| 스토어 판넬 v3(톤 레퍼런스) | `design/appstore/v3/` | 7장. 키커(영문 대문자, action/selected 색) + 2줄 헤드라인(마침표 있음) + 설명 + 폰. 아직 게시 전(게시본은 1.x 판넬) |

토큰 값(라이트 / 다크):

| 역할 | 라이트 | 다크 |
|---|---|---|
| bg/canvas | #FFFFFF | #111111 |
| bg/surface | #F5F5F5 | #1C1C1C |
| bg/elevated | #FFFFFF | #262626 |
| text/primary | #111111 | #F5F5F5 |
| text/secondary | #666666 | #B3B3B3 |
| text/tertiary | #707070 | #999999 |
| border/subtle | #E0E0E0 | #333333 |
| border/control | #888888 | #777777 |
| action/primary (CTA 바탕) | #B9E0FD | #0EB4FC |
| action/on-primary | #111111 | #111111 |
| action/pressed | #8CCBF5 | #0795D4 |
| action/selected (키커·강조 글자) | #00658C | #0EB4FC |
| action/secondary (칩 바탕) | #EAF6FF | #123041 |
| action/on-secondary | #00658C | #0EB4FC |
| media/stage (모드 무관) | #0A0A0A | #0A0A0A |
| shadow | 0 8px 24px rgba(0,0,0,.12) | 없음 |

서체 역할: 한글·영문 본문 = Noto Sans KR(title 28/600, section 22/600, body 17/400, label 15/500, caption 13) · 영문 제호 = Bodoni Moda Medium Italic(display 40) · 워드마크 `RUNGLE` = Anton(홈 헤더 28, 로고 52). 영문 라벨은 자간 +1.2pt·대문자, 한글 자간 0.

## 3. 결정 사항 (요약)

세 가지 설계안(판넬 7장을 그대로 세로로 잇는 안, 풍경 사진 풀블리드 안, 현재 구조에 토큰만 이식하는 안)을 각각 세 관점에서 심사했다.
가장 점수가 높고 리스크가 작은 "현재 구조 유지 + 토큰·서체·로고·캡처·카피 교체" 안을 기본으로 하고, 다른 안에서 판넬 카피·키커·고지 배치를 가져왔다.

1. **구조는 유지한다.** `Landing.tsx`의 섹션 순서(Nav → 히어로 → 앱 화면 4장 좌우 교차 → 원칙 3개 → 트래커 → FAQ 4문항 → 최종 CTA → 푸터), Reveal·hero-rise 모션, CTA 3개(Nav·히어로·최종) 배치, `verify.mjs` 검사 구성을 그대로 둔다. 캡처는 5장(히어로 1 + 섹션 4) 그대로라 `verify.mjs`의 캡처 수 기대값도 안 바뀐다.
2. **라이트·다크 둘 다, 시스템 추종.** 앱이 기본으로 시스템 외관을 따르듯 랜딩도 `prefers-color-scheme`만 따른다. 전환 토글 UI는 두지 않는다(앱 설정의 다크 모드 옵션은 앱 안의 일이고, 랜딩 방문자는 OS 설정으로 충분하다). 토큰은 CSS 변수라 `@media (prefers-color-scheme: dark) { :root { … } }` 블록 하나로 전환되고(§4), 앱 캡처는 라이트·다크 두 벌을 찍어 `<picture>`로 바꿔 보인다(§8). OG 이미지는 라이트 한 장만 둔다(링크 미리보기는 색 구성표를 모른다).
3. **하늘색 전면 배경은 쓰지 않는다.** 하늘색 바탕 위에 하늘색 CTA를 놓을 수 없고(버튼이 사라짐), 앱 원칙도 "하늘색은 핵심 행동에만"이다. 하늘색은 CTA 바탕과 키커 글자에만 쓴다. #B9E0FD는 글자색으로 절대 쓰지 않는다(흰 바탕 대비 1.4:1). 글자용 하늘색은 항상 #00658C.
4. **앱 화면은 실캡처만.** 판넬 v3의 화면은 DESIGN.pen 기반 시안이라 쓰지 않는다(에디터 1장만 실기기). v2.1.0 빌드를 시뮬레이터에서 찍는다(§8).
5. **풍경 사진은 넣지 않는다.** 저장소의 자체 촬영 사진은 768×1024라 웹 큰 화면에 못 쓰고, `design/assets/home-journal/`은 생성 이미지라 "자체 촬영만" 규칙에 걸린다. 폰 캡처 안의 사진으로 충분하다.
6. **카피는 판넬 v3 문장을 쓰되 사실을 v2.1.0에 맞춘다.** 섹션 헤드라인·키커는 판넬과 같게 해 스토어와 랜딩이 한 캠페인으로 읽히게 한다. 히어로 h1만 예외로, 제품이 무엇인지 말하는 문장을 따로 쓴다(§14-4). 1.x 주장 중 거짓이 된 것은 §7 표대로 고친다.
7. **새 npm 의존성 없음.** 폰트 서브셋·EXIF 주입은 `uv`로 한 번 돌리는 외부 도구다.

## 4. 디자인 토큰 (`app/globals.css`)

기존 유틸 이름은 값만 바꿔 `Landing.tsx` 수정을 줄인다. 앰버 계열만 이름을 바꾼다.

| 유틸 | 라이트 | 다크 | 비고 |
|---|---|---|---|
| `bg-canvas` | #FFFFFF | #111111 | 1.x #131313에서 |
| `bg-surface` | #F5F5F5 | #1C1C1C | 1.x `bg-media-well` 자리(짝수 섹션·트래커 배경). 이름을 바꾼다 |
| `text-ink` | #111111 | #F5F5F5 | |
| `text-body` | #666666 | #B3B3B3 | |
| `text-muted` | #707070 | #999999 | 캡션·푸터만. 본문 금지 유지 |
| `border-hairline` | #E0E0E0 | #333333 | |
| `border-control` | #888888 | #777777 | 신설. 언어 토글·CTA 테두리 |
| `bg-action` / `active:bg-action-pressed` | #B9E0FD / #8CCBF5 | #0EB4FC / #0795D4 | 1.x `bg-amber`에서 |
| `text-on-action` | #111111 | #111111 | 1.x `text-on-primary`에서 |
| `text-accent` | #00658C | #0EB4FC | 신설. 키커·FAQ hover·focus ring |
| `bg-stage` | #0A0A0A | #0A0A0A | 폰 스크린 뒤 배경(1.x `media-well` 용도) |
| `shadow-card` | 0 8px 24px rgba(0,0,0,.12) | 그대로 둔다 | 폰 목업 1곳. 앱 다크 토큰은 "없음"이지만 #111 위에서 12% 검정은 보이지 않으므로 변수 분기를 만들지 않는다 |
| 모서리 | 버튼·칩·토글 8px, 카드 12px | 같음 | `rounded-full` CTA·칩을 `rounded-lg`로 |

삭제: `amber`·`amber-pressed`·`amber-dim`·`on-primary`·`media-well`·`canvas-elevated`·`surface-card`·`paper`·`paper-soft`·`info/success/error`, `.amber-glow`·`.amber-dot-glow`·`.track-orbit`·`.float`, PhoneMockup 뒤 radial 앰버 광.

다크 구현: Tailwind v4는 `@theme`의 `--color-*`를 `:root`에 내보내고 유틸은 `var(--color-canvas)`를 참조한다. 그래서 `globals.css`에 `@media (prefers-color-scheme: dark) { :root { --color-canvas: #111111; … } }` 블록 하나(색 변수 11개)만 더하면 유틸·마크업 변경 없이 다크가 된다. `dark:` 변형, `@theme inline`, 2단 변수, 토글 스크립트는 쓰지 않는다. `:root { color-scheme: light dark }`를 넣어 스크롤바·폼 컨트롤도 따라가게 한다. `layout.tsx`의 `viewport.themeColor`는 `[{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, { media: "(prefers-color-scheme: dark)", color: "#111111" }]`.

접근성 확인값(WCAG) 라이트: #111 on #B9E0FD 13.6:1, #00658C on #FFF 6.6:1, #666 on #FFF 5.7:1, #707070 on #F5F5F5 4.54:1(통과, 여유 적음 — 13px 캡션만). 하늘 CTA 면 vs 흰 바탕은 1.4:1이라 버튼에 `border-control` 1px 테두리를 둔다(3.5:1).
다크: #111 on #0EB4FC 7.9:1, #0EB4FC on #111 7.9:1, #B3B3B3 on #111 9.0:1, #999 on #1C1C1C 6.3:1. CTA 면 vs #111 바탕 7.9:1이라 테두리 없이도 통과하지만 마크업을 나누지 않기 위해 테두리(#777)는 그대로 둔다.

## 5. 서체

| 역할 | 파일 | 굵기 | 쓰는 곳 |
|---|---|---|---|
| 본문·제목 | Noto Sans KR | 400, 600 | h1 44→lg 60(600, 자간 0 — 1.x `-0.03em` 제거), h2 32→lg 40(600), 본문 17/26(400), 키커 13(600, 대문자, 자간 .08em), CTA 15(600) |
| 영문 제호 | Bodoni Moda Medium Italic | — | 히어로·최종 CTA 각 한 줄 |
| 워드마크 | Anton Regular | — | Nav 28, 최종 CTA 로고 52 |

- 원본: `rungle/ios/Rungle/Resources/Fonts/`의 NotoSansKR-Regular·SemiBold(각 2.4MB), BodoniModa-MediumItalic, Anton-Regular. 전부 OFL — `public/fonts/LICENSE-OFL.txt` 동봉.
- 서브셋(필수 — Noto 원본은 그대로 못 싣는다): `uv tool run --from 'fonttools[woff]' pyftsubset <ttf> --unicodes="U+0020-007E,U+00A0-00FF,U+2018-201D,U+2026,U+AC00-D7A3" --flavor=woff2 --layout-features='*'`. 한글은 KS X 1001 2,350자 대신 완성형 전체(U+AC00–D7A3, 약 1MB → woff2 약 500KB)로 잡아 카피 글자가 빠질 걱정을 없앤다. 명령은 `scripts/subset-fonts.sh`에 적고 산출물 woff2를 커밋한다.
- 로드: `next/font/local`로 세 벌 선언(`--font-sans`·`--font-display`·`--font-wordmark` CSS 변수). preload·`font-display: swap`·폴백 `size-adjust`를 Next가 만든다. 두 layout의 수동 `<link rel="preload">`는 지운다.
- OG(satori)는 woff2를 못 읽는다. 같은 서브셋 명령으로 뽑은 ttf 3종(Noto SemiBold·Bodoni Italic·Anton)도 `public/fonts/`에 두고 `og.tsx`가 지금처럼 `readFile(join(process.cwd(), "public/fonts/…"))`로 읽는다(현행 패턴이 배포에서 검증됐고, public 밖 파일은 서버리스 번들 추적을 따로 확인해야 한다).
- 삭제: `public/fonts/PretendardVariable.woff2`·`Pretendard-Bold.otf`·`BarlowCondensed-SemiBold.ttf`.

## 6. 브랜드

- **로고**: `BrandPill.tsx` 파일명·export·props(`size: "sm" | "lg"`)는 그대로 두고 내용만 바꾼다(Nav·Landing import 무변경).
  - `sm`(Nav): 트랙 없이 `RUNGLE` 텍스트만(Anton 28, `text-ink`) — 앱 홈 헤더와 같다.
  - `lg`(최종 CTA): 인라인 `<svg>` 트랙(viewBox 173×94: 점이 트랙 위로 7.8 튀어나오므로 위 여백 7.8 + 트랙 86) + 러너 점 + 20px 아래 `RUNGLE` Anton 52 자간 −1. 색은 `currentColor`(외부 svg 파일은 currentColor 상속이 안 돼 인라인으로 — `TrackerIcons.tsx`와 같은 이유).
  - 모션: `lg` 러너 점이 로드 뒤 0.7초 대기 → 1.4초 한 바퀴(앱 orbitDuration) → 오른쪽 위 정지. 기존 `.pill-dot` offset-path 기법을 SVG 점에 `offset-path: path(스타디움)`으로 옮긴다. 트랙은 안 돈다. offset-path 미지원·Reduce Motion은 정적 점.
- **파비콘** `app/icon.svg`: 흰 타일 rx 14 + 검정 트랙(선 4) + 점. 앱 아이콘과 같은 모습.
- **OG** `app/lib/og.tsx`(1200×630): 흰 바탕, 왼쪽 위 `RUNGLE` Anton 40, h1 2줄 Noto 600 검정, Bodoni 이탤릭 태그라인 #666, 아래 하늘색 칩(radius 8, 검정 글자) "iOS · App Store". 앰버 글로우·Barlow 기록 칩 3개(가짜 숫자)는 삭제. `meta.ogImageAlt`도 갱신.
- 손대지 않는 것: `brand/` 영상 산출물(인스타 용도, 34MB), `scripts/logo-*.html`·`capture-logo.mjs`, `public/brand/logo-mark*.svg`(brand/README가 참조). 앰버 산출물이지만 랜딩 UI 범위 밖이라 그대로 둔다(2026-10-10 결정).

## 7. 카피와 사실 대조

### 7.1 1.x 주장 중 v2.1.0에서 바뀌어야 하는 것

| 1.x 문구(위치) | v2.1.0 사실 | 새 문구 | 근거 |
|---|---|---|---|
| "계정 없이 바로 시작해요"(CTA 마이크로카피·meta·FAQ4) | 로그인 없이 시작은 되지만 AI 베스트컷·AI 템플릿·프로젝트 저장/백업·캡처로 기록 추가는 로그인 필요 | "로그인 없이 시작해요" + FAQ4에 조건 | `pathchoice_quickstamp_auth_required_title`, `reel_template_ai_auth_required_title`, `run_entry_login_to_add`, PRD v4.6.6 US-019 AC5 |
| "사진은 아이폰 안에 — 사진·영상은 밖으로 나가지 않아요"(원칙 2·FAQ3·llms.txt) | AI 베스트컷·AI 템플릿은 사진·영상을 서버로 보내고 처리 뒤 입력을 삭제. 로그인 + 백업 켜면 프로젝트 미디어가 서버에 보관 | "AI에 보낸 사진은 처리 뒤 지워요" + 백업 조건 | 앱 CLAUDE.md 절대 금지 절, app-store-descriptions/v2.0.0.md '시작하기 전에', PRD US-019 AC4 |
| "얼굴·흔들림·구도를 보고 잘 나온 순서로"(bestcut 설명·llms.txt) | 서버 AI가 사진 속 장면을 보고 추천 | "AI가 사진 속 장면을 보고 추천해요" | release-notes v2.0.0 'AI 베스트컷' |
| "건강 데이터는 기록을 보여 주는 데만"(FAQ3) | 로그인하면 러닝 기록이 계정에 저장된다(게스트는 폰에만) | 문장 뒤에 "로그인하면 러닝 기록도 계정에 저장돼요" | PRD v4.6.6 §13, `RunSessionRepository.swift` |
| pathchoice 섹션 전체("러닝 하나 고르면…", "릴스를 만들지 사진에 기록만 넣을지") | 만들기 화면이 없다. 홈 최근 러닝 카드의 [사진 편집하기][릴스 만들기] | 홈 섹션으로 교체 | `home_recent_edit_photo_button`·`home_recent_make_reel_button` |
| editor 섹션("빈 타임라인 대신 기록이 얹힌 초안") | 자유 편집은 빈 타임라인에서 시작. 템플릿 중심 | 템플릿 섹션으로 교체 | `templates.json` |
| FAQ2 "만들기에서 '사진에 기록 넣기'" | 홈 [사진 편집하기] | 버튼명 교체 | 위와 같음 |
| "마무리는 결제창·광고 없이" | 결제 미오픈, 저장·공유 앞 광고 없음은 사실. 단 앱에 '혜택·소식 알림(광고)' 스위치가 있다 | 유지하되 "저장하고 공유하는 순간을 막아서지 않아요"로 범위 한정(en도 "at the finish" 유지). Pro 결제가 열리면 즉시 수정 | PRD, `settings_row_marketing_notification` |

유지되는 사실: 트래커 호환(HealthKit), 인스타그램 공유·저장, 얼굴은 "만들거나 바꾸거나 보정하지 않는다", iOS 전용. 홈 빈 상태의 [캡처 사진으로 편집]은 로그인 없이 되지만 캡처를 '기록'으로 저장하는 건 로그인 뒤다(`HomeEmptyRecentView.swift`에 로그인 분기 없음, 분기는 `RunHistoryView.swift`에만).

쓰지 않는 것: 속도·정확도 비교, 사용자 수, 가격·구독·무료, 안드로이드 예정, 판넬 시안에만 있는 UI('오늘의 베스트컷' 배지 등 — 앱 문자열에 없음).

### 7.2 섹션별 카피 (ko 정본 → en)

문체: 판넬 v3처럼 2줄 헤드라인에 마침표를 찍고, 설명은 해요체 두 줄. 키커는 영문 대문자.

**Nav** — `RUNGLE` · `EN`/`KO` · 앱 받기 / Get the app

**히어로** (캡처: share)
- 라벨(13, text-body): iOS · App Store / iOS · On the App Store
- h1: 달린 기록을, / 사진과 릴스로. → Run stats, / made into photos and reels.
- 설명(한 줄): 쓰던 러닝 앱의 기록을 그대로 불러와 만들어요. → Runs come straight from the app you already use. (h1이 결과물을 말하므로 `hero.sub`는 한 줄로 줄인다. 타입 `TwoLines`→`string`)
- CTA: App Store에서 받기 / Download on the App Store · 마이크로카피: iOS · 로그인 없이 시작해요 / iOS · Start without signing in
- 제호(Bodoni Italic, 텍스트 블록 맨 아래, `<p>`): Your run, reimagined.
- 1.x 3구 헤드라인(마지막 구 앰버 강조)은 2줄 검정 제목으로. `copy.ts`의 `hero.lines`는 `[string, string]`, `hero.badge`→`hero.label`, `hero.tagline` 추가. `og.tsx`가 `hero.lines[2]`·`badge`를 읽으므로 같은 PR에서 고친다.

**화면 1 · RUNNING JOURNAL** (캡처: home, 1.x pathchoice 자리)
- h2: 달린 날들이, / 나만의 이야기로. → Every run. / Part of your story.
- 설명: 쓰던 러닝 앱의 기록이 애플 건강을 거쳐 홈에 모여요. / 최근 러닝에서 바로 사진을 편집하거나 릴스를 만들어요. → Runs from the app you already use land on Home through Apple Health. / Edit a photo or make a reel straight from your latest run.

**화면 2 · AI BEST CUT** (캡처: bestcut, flip)
- h2: 많이 찍어도, / 고르는 건 가볍게. → More shots. / Less choosing.
- 설명: AI가 사진 속 장면을 보고 올릴 만한 컷을 추천해요. / 전체·인물·배경으로 나눠 보고, 마지막 한 장은 내가 골라요. → AI looks at what's in each photo and suggests the ones worth posting. / Browse all, people or scenery. The final pick is yours.
- 캡션(13, text-muted): 로그인 뒤 쓸 수 있어요. 얼굴은 알아보기만 하고, 만들거나 바꾸지 않아요. → Requires sign-in. Faces are only detected, never generated or altered.

**화면 3 · PHOTO & RECORD** (캡처: photo)
- h2: 사진 한 장에, / 오늘 달린 나. → Your photo. / Your run.
- 설명: 거리, 페이스, 시간을 풍경 위에 얹어요. / 심플한 숫자부터 말풍선, 티켓까지 스타일을 고르고 위치와 크기를 맞춰요. → Put distance, pace and time right on the scenery. / Pick a style, from clean numbers to speech bubbles and tickets, then place and resize it.
- 스타일 이름을 적을 때는 앱 표기만: 잡지 괘선·말풍선·레트로 알림창·별사탕·티켓 (`overlays.json`). 판넬 캡션("잡지처럼 깔끔하게" 등)은 쓰지 않는다.

**화면 4 · REEL TEMPLATES** (캡처: templates, flip)
- h2: 평범한 러닝도, / 색다른 릴스로. → A fresh take / on every run.
- 설명: 마음에 드는 템플릿을 고르고 내 러닝 영상으로 만들어요. / 한 달 러닝을 한 편으로 잇는 월말정산도 있어요. → Pick a template and make it with your own running videos. / Monthly Recap stitches a whole month of runs into one reel.
- 캡션: 컷편집·스파이더맨샷·웹슈터·월말정산은 AI 템플릿이라 로그인이 필요해요. → Cut Edit, Spider Shot, Web Shooter and Monthly Recap are AI templates and need sign-in. (영문명은 `templates.json` nameEn 그대로)

**원칙 3개 → "알아 두기"** (h2: 하지 않는 것도, / 필요한 것도 분명하게. → What we don't do, / and what you'll need.)
1. 얼굴은 알아보기만 — 잘 나온 컷을 고르려고 인식할 뿐, 만들거나 바꾸거나 보정하지 않아요. → Faces are only detected — to pick your best shots. Never generated, altered or retouched.
2. AI에 보낸 사진은 처리 뒤 지워요 — 사진에 기록을 얹는 편집은 아이폰 안에서 해요. AI 베스트컷·AI 템플릿에 보낸 사진·영상은 작업이 끝나면 지워요. 로그인하고 프로젝트 백업을 켜면 편집 작업과 사진은 서버에 보관해요. → AI inputs are deleted after processing — Stamping stats on a photo happens on your iPhone. Photos and videos sent for AI best cuts or AI templates are deleted when the job ends. With sign-in and project backup on, your edits and media are stored on the server.
3. 마무리는 결제창·광고 없이 — 저장하고 공유하는 순간을 막아서지 않아요. → No paywall at the finish — Saving and sharing are never blocked by a paywall or an ad.

**트래커 호환** — 헤드라인·설명·칩 4개 유지. 각주에 한 문장 추가: "기록이 없으면 러닝 앱 캡처 한 장으로도 시작해요." → "No run there? Start from a screenshot of your running app."

**FAQ 4문항** (질문 유지, 답만 v2)
- Q1 어떤 러닝 앱과 같이 쓸 수 있나요? — 애플 건강(HealthKit)에 러닝 기록을 남기는 앱이면 돼요. Strava, Nike Run Club, Garmin, Apple Watch 모두 애플 건강을 거쳐 들어와요. 기록이 없으면 러닝 앱 기록 화면 캡처를 넣어 거리·시간·페이스를 읽어 오고, 읽은 값은 눌러서 고칠 수 있어요. 캡처를 기록으로 저장하려면 로그인이 필요해요.
- Q2 릴스 말고 사진 한 장만 올리고 싶어요. — 홈 최근 러닝에서 [사진 편집하기]를 누르면 돼요. 사진 한 장에 거리·페이스·시간을 얹어 저장하거나 인스타그램으로 공유해요. 로그인 없이도 돼요. (en 버튼명: [Edit a photo])
- Q3 제 사진과 얼굴은 어떻게 다뤄지나요? — 사진에 기록을 얹거나 직접 편집할 땐 아이폰 안에서 처리해요. AI 베스트컷과 AI 템플릿은 필요한 사진·영상을 서버로 보내고, 작업이 끝나면 지워요. 로그인하고 프로젝트 백업을 켜면 편집 작업과 관련 미디어가 서버에 보관돼요. 얼굴은 만들거나 바꾸거나 보정하지 않아요. 건강 데이터는 기록을 보여 주는 데 쓰고, 로그인하면 러닝 기록도 계정에 저장돼요.
- Q4 어떤 기기에서, 로그인은 꼭 해야 하나요? — iOS 앱이에요. 로그인 없이 시작해 사진에 기록을 얹을 수 있고, AI 베스트컷·AI 템플릿·프로젝트 저장과 백업·캡처로 기록 추가에는 로그인(Apple·Google·카카오·네이버)이 필요해요. 안드로이드 버전은 없어요.

**최종 CTA** — 로고(lg) → 제호 "Every run, a story." → h2: 오늘 뛴 건, / 오늘 올리기. → Today's run, / posted today. → 설명·CTA·마이크로카피 히어로와 동일.

**푸터** — 태그라인: 달린 기록을, 사진과 릴스로. / Run stats, made into photos and reels. · © 2026 rungle · 언어 토글.

### 7.3 meta·llms.txt

- `meta.title`(검색 키워드 유지): "rungle(런글) — 러닝 기록 오버레이 사진과 러닝 릴스, 달린 기록을 사진과 릴스로" / "rungle — Running stats overlays and run Reels. Run stats, made into photos and reels."
- `meta.description`: "쓰던 러닝 앱의 기록을 애플 건강으로 불러와, 그날 찍은 사진에 거리·페이스·시간을 얹은 러닝 기록 오버레이 사진과 템플릿 릴스를 만들어요. 로그인 없이 시작, iOS App Store." / en 같은 내용. "계정 없이"·"No account needed" 제거.
- `meta.ogImageAlt`: "rungle — 달린 기록을, 사진과 릴스로" / "rungle — Run stats, made into photos and reels".
- `public/llms.txt` 고칠 줄: "자동으로 만들어 주는"·"수작업 전체를 자동 초안으로 대체"(3·11행, 템플릿 선택 → 초안 흐름으로), "얼굴이 또렷하고 흔들리지 않고"(21행, 서버 AI 장면 추천으로), "9:16, 4:5, 1:1 지원"·"영상은 쓸 만한 구간까지 추천"(21·25행, v2 확인 안 됨 — 삭제), "만들기 화면의 '사진에 기록 넣기'"(27행), "사진·영상 원본은 기기 밖으로 나가지 않는다"(60행)·영문 요약 "never leave the device", "계정 없이 바로 시작"(76행), 판매 지역 "2026-09-06 확인"(72행, 다시 확인하거나 삭제), 최종 업데이트 날짜. '무엇을 하나'에 v2 기능 추가: 하단 탭 4개, 릴스 템플릿 8종(자유 편집·컷편집·km 분할·런닝맨 프리즈·스파이더맨샷·신발 아우라·웹슈터·월말정산), 내 프로젝트(저장·백업, 로그인), 로그인 4종, 캡처로 기록 추가(로그인), 케이던스, 러닝 중 사진을 릴스 컷으로.

## 8. 앱 캡처 확보 절차

필요한 캡처 20장: `public/media/app/{ko,en}/{share,home,bestcut,photo,templates}{,-dark}.webp`, 720×1565(현행 비율 1320/2868 유지 → `PhoneMockup` aspect 무변경). 화면 5종 × 언어 2 × 외관 2. 1.x 4종(pathchoice·editor·bestcut·share)은 새 파일이 손에 들어온 뒤 같은 커밋에서 지운다.

`PhoneMockup`은 `next/image`의 `getImageProps`로 두 벌의 `srcSet`을 얻어 `<picture><source media="(prefers-color-scheme: dark)" …/><img …/></picture>`로 그린다. 브라우저가 외관에 맞는 한 장만 내려받는다. 캡처 20장은 한 번에 생기지 않을 수 있으므로, 다크 파일이 없는 화면은 `<source>`를 빼고 라이트만 보이게 두는 폴백은 만들지 않는다 — 20장이 다 모인 뒤에 배포한다.

| 캡처 | 화면 | 조건 |
|---|---|---|
| share | 릴스 공유 화면(결과 + [인스타 공유][저장하기][공유하기]) | 자유 편집으로 사진 컷 릴스를 만들어 굽는다. 게스트 가능 |
| home | 홈(RUNGLE 헤더, 최근 러닝 표지, [사진 편집하기][릴스 만들기], 이전 러닝, 탭 4개) | 시드 데이터로 바로 |
| photo | 사진 오버레이 편집(스타일이 얹힌 상태) | 게스트 가능 |
| templates | 템플릿 선택(자유 편집 버튼 + 첫 두 행: 컷편집·km 분할·런닝맨 프리즈·스파이더맨샷) | 게스트 가능. 첫 행이 런닝맨·스파이더맨인 판넬 배치는 시안 |
| bestcut | 추천 사진(전체·인물·배경 칩 + AI 추천 결과) | 로그인 + 서버 AI 필요 |

순서:
1. 시뮬레이터 iPhone 17 Pro Max(6.9형, 1320×2868. 로컬에 있음). 초기화한 기기(게스트)에서 `xcrun simctl spawn booted defaults write app.rungle.ios seedScreenshotDemo -bool YES` → DEBUG 빌드 실행하면 `DebugScreenshotSeed`가 러닝 7건을 심고 온보딩을 건너뛴다. 로그인된 기기에서는 돌리지 않는다(데모 기록이 서버로 올라간다).
2. 사진: 자체 촬영 사진(`rungle/design/appstore/src/photos/`, 스톡 금지)에 EXIF 촬영 시각을 시드 세션 시간대로 써 넣은 뒤(`uv run --with piexif python -c …` 한 줄) `xcrun simctl addmedia booted <파일>`.
3. 상태 바: `xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularBars 4`. 앱 레포의 `prep-device-capture.py`는 1170폭 전용이라 쓰지 않는다.
4. 영어: `xcrun simctl spawn booted defaults write .GlobalPreferences AppleLanguages -array en` + `AppleLocale en_US` 뒤 재부팅(시뮬레이터 `launch` 인자는 앱에 안 넘어간다).
5. bestcut: 두 번째 시뮬레이터(시드 없음)에서 테스트 계정으로 로그인 → 전체 기록 [+]에서 캡처 한 장으로 러닝 1건 추가 → 그 시간대 EXIF 사진 addmedia → AI 베스트컷 추천. 데모 기록은 그 테스트 계정에만 남는다.
6. 다크: 같은 화면에서 `xcrun simctl ui booted appearance dark`로 외관만 바꿔 한 장 더 찍는다(앱 재실행 불필요, 데이터 동일). 라이트로 되돌릴 때는 `appearance light`.
7. `xcrun simctl io booted screenshot` → `cwebp -q 86 -resize 720 0`(memory의 재생성 명령) → 파일명대로 저장.

역할: 20장 중 16장(share·home·photo·templates × 언어 2 × 외관 2)은 게스트 + 시드 데이터로 되므로 Claude가 시뮬레이터에서 찍는다. bestcut 4장만 로그인이 필요하다. 로그인은 Apple·Google·카카오 계정 인증이라 Claude가 대신할 수 없으니, 두 번째 시뮬레이터에서 사용자가 자기 계정으로 한 번 로그인해 주면 그 뒤(기록 추가·사진·AI 추천·캡처)는 Claude가 한다. 데모 기록 1건이 그 계정에 남으므로 캡처 뒤 앱의 전체 기록에서 지운다(캡처로 추가한 기록은 삭제할 수 있다. 건강 앱 기록만 삭제 불가).

캡처가 없으면 코드가 끝나도 배포하지 못한다. 임계 경로이니 구현과 병행해 먼저 시작한다.

## 9. 모션

유지: Reveal(IntersectionObserver), hero-rise 스태거, FAQ '+' 회전, `@media (scripting: none)` 폴백, reduced-motion 블록(선택자 이름을 새 클래스에 맞춰 갱신).
변경: 로고 러너 점 한 바퀴(§6).
삭제: 히어로 트랙 궤도(.track-orbit), 폰 부유(.float), 앰버 글로우 2종. 판넬에 움직이는 장식이 없고 앱 v2 모션 원칙도 "점만 돈다"라 정적이 맞다.

## 10. 바뀌는 파일

| 파일 | 변경 |
|---|---|
| `app/globals.css` | 토큰 교체, 다크 `@media` 블록(색 변수 11개)·`color-scheme`, @font-face → next/font 변수 연결, 장식 모션 CSS 삭제, 상단 주석 갱신 |
| `app/lib/copy.ts` | ko 정본·en 전면 교체, `hero` 타입 변경, `screens` 키 변경(home·bestcut·photo·templates), 캡션 필드 추가 |
| `app/components/Landing.tsx` | track-orbit div 삭제, 히어로 라벨·제호·2줄 h1, 키커 대문자·accent, 캡션 렌더, 칩·CTA 모서리 8, 섹션 배경 `bg-surface` |
| `app/components/BrandPill.tsx` | 내용만 v2 마크로(파일명·props 유지) |
| `app/components/PhoneMockup.tsx` | `AppScreen` 키 교체, 앰버 광 삭제, 그림자 토큰, 베젤 #111, `getImageProps` + `<picture>`로 라이트·다크 캡처 분기 |
| `app/components/Nav.tsx` | amber→action, rounded-full→8px, 워드마크 |
| `app/components/AppStoreButton.tsx` | amber-glow 삭제, bg-action + border-control, 높이 52, radius 8 |
| `app/lib/og.tsx` | 흰 바탕·v2 마크·Noto/Bodoni/Anton ttf(`public/fonts/`), 기록 칩 삭제 |
| `app/(ko)/layout.tsx`, `app/(en)/layout.tsx` | 수동 preload 삭제, next/font 변수 클래스, `viewport.colorScheme`·`themeColor` |
| `app/icon.svg` | v2 아이콘 |
| `public/fonts/` | Pretendard·Barlow 삭제, Noto 400/600·Bodoni Italic·Anton woff2 + OG용 ttf 3개 + LICENSE-OFL.txt |
| `app/lib/fonts.ts` | 신규. `next/font/local` 선언 3개(`--font-noto`·`--font-bodoni`·`--font-anton`) |
| `public/media/app/{ko,en}/` | 1.x 4장 삭제, v2 라이트 5장 + 다크 5장 |
| `public/llms.txt` | §7.3 |
| `scripts/verify.mjs` | h1 기대값 "달린 기록을"/"Run stats", 금지 문구에 "계정 없이"·"no account" 추가. 다크 패스 추가: `colorScheme: "dark"` 컨텍스트에서 body 배경 `rgb(17, 17, 17)`, 폰 `<img>`의 `currentSrc`가 `-dark.webp`, 모바일 가로 스크롤 없음, `ko-dark-full.png` 저장. 캡처 5장(`<picture>` 안 `<img>` 수)·FAQ 4·링크 3은 그대로 |
| `scripts/subset-fonts.sh` | 신규, 서브셋 명령 기록 |

변경 없음: `Reveal.tsx`, `TrackerIcons.tsx`, `MetaPixel.tsx`, `lib/seo.ts`(title·description은 copy.ts에서), `lib/locales.ts`, `robots.ts`, `sitemap.ts`, `next.config.ts`, `package.json`.

## 11. 검증

- `pnpm build` → `node scripts/verify.mjs`(ko/en h1·링크 3·캡처 5·FAQ 4·금지 문구·모바일 가로 스크롤·og:image png, 그리고 ko 다크 패스) 전부 PASS.
- 추가 수동 확인: 390px에서 히어로 CTA가 첫 화면에 보이는지(폰 270폭이면 높이 587px이라 글자 아래로 밀린다 — 모바일은 글자 → CTA → 폰 순 유지), 하늘 CTA 테두리, 폰트 폴백 시 레이아웃 튐, Reduce Motion에서 점 정지. 다크에서 로고(`currentColor`)·트래커 아이콘·FAQ 구분선이 보이는지, `ko-dark-full.png`로 훑는다.
- 캡처 20장이 모두 `public/media/app`에 있는지 빌드 전에 확인.

## 12. 범위 밖 (이번 PR에서 하지 않음)

- 다크 전환 토글 UI, 다크용 OG 이미지, en 다크 verify 패스(ko 한 번으로 CSS 분기는 검증된다).
- `brand/` 영상·`scripts/logo-*`·`public/brand/logo-mark*.svg` 삭제(1.x 앰버 산출물은 그대로 둔다 — 2026-10-10 결정).
- 풍경 사진 섹션, 월말정산·웹슈터·에디터 별도 섹션(캡처 7장 안).
- 스토어 판넬 v3 게시 일정과 묶지 않는다. 랜딩은 실캡처라 먼저 나가도 거짓이 아니다.

## 13. 리스크

- 캡처가 임계 경로다. 다크를 넣어 20장이 됐다(외관 전환은 명령 한 줄이라 촬영 시간은 거의 늘지 않는다). bestcut 4장은 사용자가 시뮬레이터에 로그인해 줘야 한다.
- 다크 캡처는 앱이 다크 토큰을 다 적용했을 때만 어색하지 않다. v2.1.0 화면 중 다크에서 깨지는 곳이 보이면 랜딩이 아니라 앱 이슈로 올리고, 그 화면은 라이트 캡처를 다크에도 쓰지 않고 수정을 기다린다.
- "결제창·광고 없이"는 Pro 결제가 열리면 거짓이 된다. 앱 레포 결제 오픈 이슈를 랜딩 수정 트리거로 둔다.
- Noto 서브셋 밖 글자(한자·확장 한글)가 카피에 들어오면 폴백 서체로 섞여 보인다. 완성형 전체를 넣어 위험을 줄였다.
- `og.tsx`가 `hero.lines[2]`·`hero.badge`를 직접 읽는다. copy 타입 변경과 같은 PR에서 고치지 않으면 빌드가 깨진다.

## 14. 결정 기록과 미결

2026-10-10 결정:

1. **다크 모드**: 1차부터 라이트·다크 둘 다, 시스템 추종(§3-2, §4, §8).
2. **캡처 역할**: 게스트로 되는 16장은 Claude가 찍는다. bestcut 4장은 사용자가 두 번째 시뮬레이터에 자기 계정으로 로그인해 준 뒤 Claude가 찍는다(§8).
3. **1.x 앰버 산출물**: 그대로 둔다.

4. **히어로 h1**: A안 확정(2026-10-10). 판넬 문장 "달린 풍경을, 나의 콘텐츠로."는 쓰지 않는다 — "풍경"은 랜딩에 풍경 사진이 없는데 풍경을 약속하고, "콘텐츠"는 무엇을 만들어 주는지 말하지 않아 첫 방문자가 2초 안에 제품을 못 알아본다. 후보:
   - **A(추천)** 달린 기록을, / 사진과 릴스로. → Run stats, / made into photos and reels. 입력(기록)과 결과물 둘(사진·릴스)을 다 말한다. 스토어 부제 "러닝 사진부터 기록 릴스까지"와 같은 뜻이고 히어로 캡처(릴스 공유 화면)와 맞는다. "러닝 기록"·"릴스"가 검색 키워드다. 히어로 설명 첫 줄("러닝 기록을 얹은 사진부터 릴스까지")과 겹치므로 설명 첫 줄은 "쓰던 러닝 앱의 기록을 그대로 불러와 만들어요." 한 줄로 줄인다.
   - **B** 러닝 사진부터, / 기록 릴스까지. → From run photos / to stats reels. 스토어 부제 그대로라 스토어·랜딩이 한 문장으로 읽힌다. 다만 "기록 릴스"가 명사 둘을 붙인 조어라 소리 내 읽으면 걸린다.
   - **C** 뛴 만큼, / 올릴 게 생겨요. → Every run / gives you something to post. 감정형. 최종 CTA "오늘 뛴 건, 오늘 올리기."와 운이 맞지만 제품이 무엇인지는 설명이 받쳐야 한다.
   
   A안이 §7.2·7.3·§10에 반영돼 있다. 미결 없음.
