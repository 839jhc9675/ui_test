import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const OPTIONS = [
  { value: 'standard', label: '일반 배송' },
  { value: 'express', label: '빠른 배송' },
  { value: 'dawn', label: '새벽 배송' },
  { value: 'pickup', label: '매장 픽업' },
];

/**
 * RadioSection 컴포넌트
 *
 * RadioGroup 단일 선택 + 선택된 옵션 표시 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <RadioSection />
 */
function RadioSection() {
  const [value, setValue] = useState(OPTIONS[0].value);

  const selected = OPTIONS.find((option) => option.value === value);

  return (
    <Stack spacing={ 1 }>
      <FormControl>
        <FormLabel id="radio-group-label">배송 방법</FormLabel>
        <RadioGroup
          aria-labelledby="radio-group-label"
          name="delivery"
          value={ value }
          onChange={ (event) => setValue(event.target.value) }
        >
          { OPTIONS.map((option) => (
            <FormControlLabel
              key={ option.value }
              value={ option.value }
              label={ option.label }
              control={ <Radio /> }
            />
          )) }
        </RadioGroup>
      </FormControl>
      <Typography variant="body2" color="text.secondary">
        선택된 옵션: { selected.label } ({ selected.value })
      </Typography>
    </Stack>
  );
}

export default RadioSection;
