# run-log 브랜드 마크 산출물 (2026-07-02)

400m 트랙 필 + 달리는 점. **문자 없음** — 서비스명이 가제(run-log)라 언제든 바뀔 수
있어 마크만 사용한다. 기하 정본: `docs/design.html` brand-pill 스펙
(앰버 #FFB300 외곽선 + 트랙 위 도트, 글로우 rgba(255,179,0,.5)).

모션 스펙 (개발 브리프): 도트가 정적 위치(오른쪽 위, 인스타 점 위치)에서 출발해
트랙을 **반시계**(실제 400m 트랙 주행 방향)로 정확히 한 바퀴 돌고 제자리에 멈춘다.
타임라인: 0.4s 홀드 → 2.4s 랩(easeInOutSine) → 0.4s 홀드, 30fps.

## 산출물 3종

| 파일 | 용도 | 스펙 |
|---|---|---|
| `../public/brand/logo-mark-animated.svg` | ① 웹 — 랜딩 히어로·로딩 재사용 | CSS offset-path 한 바퀴, Reduce Motion 시 정지, 미지원 브라우저 정적 폴백. 루프가 필요하면 `animation-iteration-count`만 `infinite`로 |
| `logo-lap-alpha-prores4444.mov` | ② 투명 배경 영상 — 인스타 릴스 편집 오버레이 | 1080×1080 · 30fps · 3.2s · ProRes 4444 (`yuva444p12le`, 알파 검증 완료) |
| `logo-bumper-dark-1080x1920.mp4` | ③ 다크 배경 범퍼 — 인트로/아웃트로 | 1080×1920(9:16) · 30fps · 3.2s · H.264 · 배경 #131313 |

보조:
- `../public/brand/logo-mark.svg` — 정적 마크 (파비콘·문서용)
- `logo-lap-alpha-hevc.mov` — HEVC 알파 후보(268KB, hvc1). ⚠ 알파는 보조 레이어라
  ffprobe로 검증 불가 — QuickTime/Final Cut에서 투명도 확인 후 사용. 확실한 건 ProRes.
- `logo-profile-2048.png` — 인스타 프로필용 (2048², 다크 배경, 원형 크롭 안전)

## v2 — "가속 랩 + 카메라 플래시" (2026-07-02 사용자 디렉션)

천천히 출발 → easeInQuart 가속으로 한 바퀴 휘돌아 하드 스톱 → 도착 순간
카메라 플래시(도트 스웰 + 화이트 베일 점멸 + 섬광 버스트 + 충격파 링). 총 2.8s.

| 파일 | 용도 |
|---|---|
| `../public/brand/logo-mark-flash.svg` | 웹 (CSS, Reduce Motion 대응) |
| `logo-flash-alpha-prores4444.mov` | 투명 배경 영상 (1080², 알파) |
| `logo-flash-alpha-hevc.mov` | HEVC 알파 후보 (QuickTime 검증 필요) |
| `logo-flash-bumper-dark-1080x1920.mp4` | 다크 범퍼 (9:16) |

재생성: `node scripts/capture-logo.mjs <outDir> logo-frames-flash.html` → 위 ffmpeg
(d=2.8로 변경). 타임라인 SSOT: `scripts/logo-frames-flash.html`.
생성형 AI로 같은 모션을 뽑는 프롬프트: `genai-logo-prompt.md`.

## 재생성 방법

```bash
# 1) 프레임 캡처 (1080×1080 알파 PNG 96장)
node scripts/capture-logo.mjs /tmp/logo-frames

# 2) 인코딩
ffmpeg -framerate 30 -i /tmp/logo-frames/f_%04d.png \
  -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le brand/logo-lap-alpha-prores4444.mov
ffmpeg -f lavfi -i "color=c=0x131313:s=1080x1920:r=30:d=3.2" \
  -framerate 30 -i /tmp/logo-frames/f_%04d.png \
  -filter_complex "[0:v][1:v]overlay=(W-w)/2:(H-h)/2:shortest=1" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart brand/logo-bumper-dark-1080x1920.mp4
```

소스: `scripts/logo-frames.html` (지오메트리·타임라인 SSOT) + `scripts/capture-logo.mjs`.
이름 확정 후 문자 결합형 로고를 만들 땐 이 마크 기하를 그대로 쓰고 우측에 워드마크를 붙인다.
