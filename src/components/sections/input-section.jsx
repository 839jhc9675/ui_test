import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const VARIANTS = ['standard', 'outlined', 'filled'];

/**
 * InputSection 컴포넌트
 *
 * variant별 TextField + 입력값 실시간 표시 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <InputSection />
 */
function InputSection() {
  const [values, setValues] = useState({ standard: '', outlined: '', filled: '' });

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({ ...prev, [variant]: event.target.value }));
  };

  return (
    <Stack spacing={ 3 }>
      { VARIANTS.map((variant) => (
        <Box key={ variant }>
          <TextField
            fullWidth
            variant={ variant }
            label={ `${variant} 입력` }
            placeholder={ `${variant} 필드에 입력하세요` }
            value={ values[variant] }
            onChange={ handleChange(variant) }
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, wordBreak: 'break-all' }}>
            입력값: { values[variant] || '(비어 있음)' }
          </Typography>
        </Box>
      )) }
    </Stack>
  );
}

export default InputSection;
