# 생성형 AI 영상 모델용 로고 모션 프롬프트

대상 모션: "가속 랩 + 카메라 플래시" (v2 — `logo-flash-*` 산출물과 동일 콘셉트).
Veo · Sora · Runway · Kling · Pika · Hailuo 등 텍스트/이미지-투-비디오 모델용.

## 사용법

1. **이미지-투-비디오 강력 권장**: 시작 프레임으로 `logo-profile-2048.png`
   (다크 배경 정적 마크)를 업로드하고 아래 프롬프트를 붙인다. 텍스트만으로는
   기하가 정확히 재현되지 않는다 (필 비율·도트 위치가 흔들림).
2. 결과물에서 기하가 뭉개지면 "flat 2D vector, no perspective" 부분을 앞으로
   당기고 negative prompt를 강화한다.
3. 16:9로 뽑힌다면 프롬프트 끝에 "1:1 square composition" 대신 원하는 비율을 명시.

## 메인 프롬프트 (EN — 모델 성능이 가장 좋음)

> Minimal flat 2D vector motion graphics on a solid dark charcoal background
> (#131313). A single rounded-pill outline in amber (#FFB300), shaped like a
> 400m running track seen from above, thick clean stroke, perfectly centered.
> A small glowing amber dot sits on the track line at the upper right.
> The dot starts to crawl counterclockwise very slowly, then smoothly picks up
> speed and whips around the track in one fast dynamic sweep — exactly one
> full lap — and snaps to a hard stop at its original upper-right position.
> The instant it stops, a camera flash fires: the dot swells and flares
> bright white-amber, a thin white shockwave ring expands outward and fades,
> and the whole frame blinks brighter for a split second like a photo being
> taken, then settles back to the calm glowing dot.
> Flat vector style, crisp anti-aliased edges, subtle warm glow, no 3D, no
> perspective, no camera movement, no text, no letters, no extra shapes.
> Duration about 3 seconds, 1:1 square composition, dark minimal branding.

## Negative prompt

> text, letters, typography, watermark, 3D render, depth, shadows on ground,
> camera zoom, camera pan, background texture, gradients in background,
> extra circles, particles, sparks, lens flare streaks, human, shoes, road

## 메인 프롬프트 (KO — 한국어 입력을 받는 모델용)

> 짙은 차콜(#131313) 단색 배경 위의 미니멀 플랫 2D 벡터 모션그래픽.
> 위에서 내려다본 400m 육상 트랙 모양의 앰버(#FFB300) 라운드 필 외곽선이
> 화면 중앙에 있고, 트랙 선 오른쪽 위에 은은하게 빛나는 작은 앰버 점이 있다.
> 점이 반시계 방향으로 아주 천천히 기어가듯 출발하다가 점점 가속을 받아
> 역동적으로 트랙을 정확히 한 바퀴 휘돌고, 원래 자리(오른쪽 위)에 탁 멈춘다.
> 멈추는 순간 카메라 플래시가 터진다: 점이 부풀며 흰빛-앰버로 번쩍이고,
> 얇은 흰 충격파 링이 퍼지며 사라지고, 사진 찍히듯 화면 전체가 아주 잠깐
> 밝아졌다가 다시 차분한 점으로 돌아온다.
> 플랫 벡터 스타일, 선명한 엣지, 은은한 웜 글로우. 3D 금지, 원근 금지,
> 카메라 움직임 금지, 텍스트·글자 금지, 다른 도형 금지.
> 길이 약 3초, 1:1 정사각 구도, 다크 미니멀 브랜딩.

## 타이밍 참고값 (편집자/모션 디자이너 전달용)

- 0.0–0.3s 홀드 (점은 오른쪽 위 정지)
- 0.3–1.9s 랩: easeInQuart — 처음 절반은 거의 기어가고 마지막 1/3에서 급가속, 하드 스톱
- 1.9–2.4s 플래시: 스웰(0.1s) → 섬광 베일 점멸 + 충격파 링 확산(0.3s) → 정리(0.1s)
- 2.4–2.8s 홀드
- 방향: 반시계 (실제 400m 트랙 주행 방향)
