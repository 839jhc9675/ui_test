import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { DemoBox, Stage } from '../ui/index.js';

/** CSS 애니메이션 (keyframes) */
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(-24px); }
  50% { transform: translateY(0); }
  70% { transform: translateY(-10px); }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
`;
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.25); }
`;

const CSS_ANIMATIONS = [
  { id: 'bounce', label: 'Bounce', animation: `${bounce} 0.8s ease` },
  { id: 'spin', label: 'Spin', animation: `${spin} 0.6s ease-in-out` },
  { id: 'shake', label: 'Shake', animation: `${shake} 0.5s ease` },
  { id: 'pulse', label: 'Pulse', animation: `${pulse} 0.6s ease` },
];

/**
 * AnimationSection 컴포넌트
 *
 * MUI 트랜지션(Fade · Grow · Slide) + CSS keyframes 애니메이션 + 둘의 조합 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <AnimationSection />
 */
function AnimationSection() {
  /** 1) MUI 트랜지션: 보이기/숨기기 토글 */
  const [shown, setShown] = useState({ fade: true, grow: true, slide: true });
  /** Slide가 무대 안쪽에서 움직이도록 기준 요소를 state로 받습니다 (렌더 중 ref.current 접근 방지) */
  const [slideStage, setSlideStage] = useState(null);

  const toggle = (name) => setShown((prev) => ({ ...prev, [name]: !prev[name] }));

  /** 2) CSS 애니메이션: key를 바꿔서 같은 애니메이션도 매번 다시 재생 */
  const [cssAnimation, setCssAnimation] = useState({ id: null, key: 0 });
  const currentCss = CSS_ANIMATIONS.find((item) => item.id === cssAnimation.id);

  const playCss = (id) => setCssAnimation((prev) => ({ id, key: prev.key + 1 }));

  /** 3) 조합: Grow로 등장 → 등장이 끝나면(onEntered) CSS bounce 재생 */
  const [comboShown, setComboShown] = useState(false);
  const [comboBouncing, setComboBouncing] = useState(false);

  const playCombo = () => {
    setComboBouncing(false);
    setComboShown(false);
    /** 한 번 숨긴 뒤 다음 프레임에 다시 보여야 Grow가 처음부터 재생됩니다. */
    requestAnimationFrame(() => setComboShown(true));
  };

  return (
    <Stack spacing={ 4 }>
      <Box>
        <Typography variant="subtitle1" fontWeight={ 600 } sx={{ mb: 2 }}>
          MUI 트랜지션
        </Typography>
        <Grid container spacing={ 2 }>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stage title="Fade · 투명도">
              <Fade in={ shown.fade } timeout={ 600 }>
                <div>
                  <DemoBox label="Fade" />
                </div>
              </Fade>
            </Stage>
            <Button fullWidth variant="outlined" onClick={ () => toggle('fade') }>
              { shown.fade ? '숨기기' : '보이기' }
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stage title="Grow · 크기 + 투명도">
              <Grow in={ shown.grow } timeout={ 600 }>
                <div>
                  <DemoBox label="Grow" color="secondary.main" />
                </div>
              </Grow>
            </Stage>
            <Button fullWidth variant="outlined" color="secondary" onClick={ () => toggle('grow') }>
              { shown.grow ? '숨기기' : '보이기' }
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stage title="Slide · 위치 이동" stageRef={ setSlideStage }>
              <Slide in={ shown.slide } direction="up" container={ slideStage } timeout={ 500 }>
                <div>
                  <DemoBox label="Slide" color="success.main" />
                </div>
              </Slide>
            </Stage>
            <Button fullWidth variant="outlined" color="success" onClick={ () => toggle('slide') }>
              { shown.slide ? '숨기기' : '보이기' }
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={ 600 } sx={{ mb: 2 }}>
          CSS 애니메이션 (keyframes)
        </Typography>
        <Stage title={ `재생 중: ${currentCss?.label ?? '(없음)'}` }>
          <DemoBox
            key={ cssAnimation.key }
            label={ currentCss?.label ?? 'CSS' }
            color="warning.main"
            sx={{ animation: currentCss?.animation }}
          />
        </Stage>
        <Stack direction="row" spacing={ 1 } useFlexGap sx={{ flexWrap: 'wrap' }}>
          { CSS_ANIMATIONS.map((item) => (
            <Button key={ item.id } variant="contained" color="warning" onClick={ () => playCss(item.id) }>
              { item.label }
            </Button>
          )) }
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={ 600 } sx={{ mb: 2 }}>
          조합: MUI Grow 등장 → CSS Bounce
        </Typography>
        <Stage title="Grow가 끝나는 순간(onEntered) Bounce가 이어서 재생됩니다">
          <Grow in={ comboShown } timeout={ 500 } onEntered={ () => setComboBouncing(true) }>
            <div>
              <DemoBox
                label="Combo"
                color="error.main"
                sx={{ animation: comboBouncing ? `${bounce} 0.8s ease` : 'none' }}
              />
            </div>
          </Grow>
        </Stage>
        <Button variant="contained" color="error" onClick={ playCombo }>
          조합 애니메이션 재생
        </Button>
      </Box>
    </Stack>
  );
}

export default AnimationSection;
