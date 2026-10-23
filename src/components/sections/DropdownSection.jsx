import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const OPTIONS = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'grape', label: '포도' },
  { value: 'orange', label: '오렌지' },
  { value: 'strawberry', label: '딸기' },
  { value: 'watermelon', label: '수박' },
]

// Select 드롭다운 + 선택값 실시간 표시 섹션
export default function DropdownSection() {
  const [value, setValue] = useState('')

  const selected = OPTIONS.find((option) => option.value === value)

  return (
    <Stack spacing={1}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">과일 선택</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown-select"
          label="과일 선택"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2" color="text.secondary">
        선택값: {selected ? `${selected.label} (${selected.value})` : '(선택 안 함)'}
      </Typography>
    </Stack>
  )
}
