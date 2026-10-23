import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'

// 마우스 호버와 키보드 포커스(Tab) 모두에서 효과가 보이도록 같은 선택자로 묶습니다.
const ACTIVE = '&:hover, &:focus-visible'

const EFFECTS = [
  {
    id: 'color',
    title: '색상 변화',
    description: '배경과 글자색이 바뀝니다',
    sx: {
      [ACTIVE]: { bgcolor: 'primary.main', color: 'primary.contrastText' },
    },
  },
  {
    id: 'scale',
    title: '크기 변화',
    description: '1.08배로 커집니다',
    sx: {
      [ACTIVE]: { transform: 'scale(1.08)' },
    },
  },
  {
    id: 'shadow',
    title: '그림자 효과',
    description: '떠오르며 그림자가 깊어집니다',
    sx: {
      [ACTIVE]: { transform: 'translateY(-6px)', boxShadow: 10 },
    },
  },
  {
    id: 'border',
    title: '테두리 강조',
    description: '테두리가 진해지고 빛이 번집니다',
    sx: (theme) => ({
      [ACTIVE]: {
        borderColor: 'secondary.main',
        boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.2)}`,
      },
    }),
  },
  {
    id: 'rotate',
    title: '회전',
    description: '살짝 기울어집니다',
    sx: {
      [ACTIVE]: { transform: 'rotate(-4deg)' },
    },
  },
  {
    id: 'gradient',
    title: '그라데이션',
    description: '그라데이션 배경으로 바뀝니다',
    sx: {
      backgroundImage: 'linear-gradient(135deg, transparent 0%, transparent 100%)',
      [ACTIVE]: {
        color: 'common.white',
        backgroundImage: 'linear-gradient(135deg, #42a5f5 0%, #ab47bc 100%)',
      },
    },
  },
  {
    id: 'underline',
    title: '밑줄 확장',
    description: '아래쪽 밑줄이 가운데서 퍼집니다',
    sx: {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: '50%',
        right: '50%',
        bottom: 0,
        height: 4,
        bgcolor: 'success.main',
        transition: 'left 0.3s, right 0.3s',
      },
      '&:hover::after, &:focus-visible::after': { left: 0, right: 0 },
    },
  },
  {
    id: 'overlay',
    title: '오버레이',
    description: '가려진 안내 문구가 올라옵니다',
    overlay: '자세히 보기 →',
  },
]

// 공통 카드 스타일: 위치·전환 효과는 여기서, 효과별 차이는 EFFECTS[].sx에서
const baseSx = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 140,
  p: 2,
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  textAlign: 'left',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  color: 'text.primary',
  transition: 'all 0.25s ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}

// 오버레이 카드: 호버 시 아래에서 덮개가 올라옵니다
const overlaySx = {
  '& .hover-overlay': {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    color: 'common.white',
    fontWeight: 600,
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease',
  },
  [ACTIVE]: { '& .hover-overlay': { transform: 'translateY(0)' } },
}

// ButtonBase로 만든 호버 효과 카드 8종 섹션
export default function HoverSection() {
  const [lastHovered, setLastHovered] = useState(null)

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {EFFECTS.map((effect) => (
          <Grid key={effect.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ButtonBase
              focusRipple
              onMouseEnter={() => setLastHovered(effect.title)}
              onFocus={() => setLastHovered(effect.title)}
              sx={[baseSx, effect.overlay ? overlaySx : effect.sx]}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {effect.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                {effect.description}
              </Typography>
              {effect.overlay && <Box className="hover-overlay">{effect.overlay}</Box>}
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" color="text.secondary">
        마지막으로 호버한 카드: {lastHovered ?? '(없음)'} · Tab 키로 이동해도 같은 효과가 보입니다.
      </Typography>
    </Stack>
  )
}
