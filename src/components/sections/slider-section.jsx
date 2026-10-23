import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** 0, 25, 50, 75, 100 지점에 구간 표시 */
const MARKS = [0, 25, 50, 75, 100].map((value) => ({ value, label: String(value) }));

/**
 * SliderSection 컴포넌트
 *
 * 0~100 슬라이더 + marks + 현재 값 실시간 표시 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <SliderSection />
 */
function SliderSection() {
  const [value, setValue] = useState(50);

  return (
    <Stack spacing={ 1 }>
      <Box sx={{ px: 1 }}>
        <Slider
          aria-label="값 조절"
          min={ 0 }
          max={ 100 }
          value={ value }
          onChange={ (event, newValue) => setValue(newValue) }
          marks={ MARKS }
          valueLabelDisplay="auto"
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        현재 값: { value }
      </Typography>
    </Stack>
  );
}

export default SliderSection;
