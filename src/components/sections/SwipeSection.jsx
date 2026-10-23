import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import gradientImage from '../../utils/gradientImage.js'

const SLIDES = [
  { id: 'spring', title: '봄', image: gradientImage('#f48fb1', '#ad1457', '봄 🌸') },
  { id: 'summer', title: '여름', image: gradientImage('#4fc3f7', '#01579b', '여름 🌊') },
  { id: 'autumn', title: '가을', image: gradientImage('#ffb74d', '#bf360c', '가을 🍁') },
  { id: 'winter', title: '겨울', image: gradientImage('#b0bec5', '#37474f', '겨울 ⛄') },
  { id: 'night', title: '밤', image: gradientImage('#7e57c2', '#1a237e', '밤 🌙') },
]
const COUNT = SLIDES.length

// 무한 반복용 트랙: [마지막 복제, ...원본, 첫 번째 복제]
// 복제본에 도착하면 애니메이션 없이 같은 모양의 원본 위치로 순간 이동합니다.
const TRACK = [
  { ...SLIDES[COUNT - 1], key: 'clone-last', clone: true },
  ...SLIDES.map((slide) => ({ ...slide, key: slide.id, clone: false })),
  { ...SLIDES[0], key: 'clone-first', clone: true },
]

// 이 거리(px) 이상 끌거나, 빠르게 튕기면(velocity) 슬라이드가 넘어갑니다.
const SWIPE_DISTANCE = 50
const SWIPE_VELOCITY = 0.3

const DIRECTION_TEXT = { Left: '왼쪽 스와이프 → 다음', Right: '오른쪽 스와이프 → 이전' }

// react-swipeable로 터치/마우스 스와이프하는 무한 반복 이미지 슬라이더 + 이전/다음 버튼 섹션
export default function SwipeSection() {
  // position: TRACK 안의 위치 (1 ~ COUNT가 원본, 0과 COUNT + 1은 복제본)
  const [position, setPosition] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [moving, setMoving] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [lastGesture, setLastGesture] = useState(null)

  // 화면에 보여줄 실제 슬라이드 번호 (0 ~ COUNT - 1)
  const index = (position - 1 + COUNT) % COUNT

  // 이동 중(애니메이션 진행 중)에는 새 이동을 받지 않아 복제본 너머로 넘어가지 않게 합니다.
  const moveTo = (nextPosition) => {
    if (moving || nextPosition === position) return
    setAnimate(true)
    setMoving(true)
    setPosition(nextPosition)
  }

  const next = () => moveTo(position + 1)
  const prev = () => moveTo(position - 1)

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return
    setMoving(false)
    if (position !== 0 && position !== COUNT + 1) return

    // 복제본 → 원본으로 순간 이동 후, 다음 프레임부터 다시 애니메이션 켜기
    setAnimate(false)
    setPosition(position === 0 ? COUNT : 1)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
  }

  const handlers = useSwipeable({
    // 끄는 동안 손가락/마우스를 따라 움직입니다.
    onSwiping: ({ deltaX }) => {
      if (moving) return
      setDragOffset(deltaX)
    },
    onSwiped: ({ dir, absX, velocity }) => {
      setDragOffset(0)
      if (moving) return
      if (dir !== 'Left' && dir !== 'Right') return
      if (absX < SWIPE_DISTANCE && velocity < SWIPE_VELOCITY) return

      setLastGesture(dir)
      if (dir === 'Left') next()
      else prev()
    },
    trackMouse: true,
  })

  return (
    <Stack spacing={2}>
      <Box
        {...handlers}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          cursor: dragOffset ? 'grabbing' : 'grab',
          userSelect: 'none',
          // 세로 스크롤은 브라우저에 맡기고, 가로 움직임만 스와이프로 처리
          touchAction: 'pan-y',
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="이미지 슬라이더"
      >
        <Box
          onTransitionEnd={handleTransitionEnd}
          onTransitionCancel={handleTransitionEnd}
          sx={{
            display: 'flex',
            transform: `translateX(calc(${-position * 100}% + ${dragOffset}px))`,
            // 끄는 중이거나 순간 이동할 때는 즉시, 그 외에는 부드럽게
            transition: animate && !dragOffset ? 'transform 0.35s ease' : 'none',
          }}
        >
          {TRACK.map((slide, i) => (
            <Box
              key={slide.key}
              component="img"
              src={slide.image}
              alt={slide.clone ? '' : `${slide.title} 슬라이드`}
              draggable={false}
              aria-hidden={slide.clone || i !== position}
              sx={{ flex: '0 0 100%', width: '100%', aspectRatio: '2 / 1', display: 'block' }}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            px: 1.5,
            py: 0.5,
            borderRadius: 4,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'common.white',
            typography: 'body2',
          }}
        >
          {index + 1} / {COUNT}
        </Box>
      </Box>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={prev}>
          ← 이전
        </Button>
        <Stack direction="row" spacing={1} role="tablist" aria-label="슬라이드 선택">
          {SLIDES.map((slide, i) => (
            <ButtonBase
              key={slide.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1}번 슬라이드: ${slide.title}`}
              onClick={() => moveTo(i + 1)}
              sx={{
                width: i === index ? 24 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: i === index ? 'primary.main' : 'action.disabled',
                transition: 'width 0.25s, background-color 0.25s',
              }}
            />
          ))}
        </Stack>
        <Button variant="outlined" onClick={next}>
          다음 →
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        현재 슬라이드: {index + 1}번 ({SLIDES[index].title}) · 마지막 제스처:{' '}
        {lastGesture ? DIRECTION_TEXT[lastGesture] : '(없음)'}
      </Typography>
    </Stack>
  )
}
