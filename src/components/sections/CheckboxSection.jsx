import { useState } from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
]

// 다중 선택 체크박스 + 전체 선택/해제 + 선택 개수 실시간 표시 섹션
export default function CheckboxSection() {
  const [checked, setChecked] = useState([])

  const allChecked = checked.length === OPTIONS.length
  const someChecked = checked.length > 0 && !allChecked

  const handleToggle = (value) => (event) => {
    setChecked((prev) =>
      event.target.checked ? [...prev, value] : prev.filter((item) => item !== value),
    )
  }

  const handleToggleAll = (event) => {
    setChecked(event.target.checked ? OPTIONS.map((option) => option.value) : [])
  }

  return (
    <Stack spacing={1}>
      <FormControlLabel
        label="전체 선택"
        control={
          <Checkbox checked={allChecked} indeterminate={someChecked} onChange={handleToggleAll} />
        }
      />
      <Divider />
      <Box sx={{ pl: 3 }}>
        <FormGroup>
          {OPTIONS.map((option) => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              control={
                <Checkbox
                  checked={checked.includes(option.value)}
                  onChange={handleToggle(option.value)}
                />
              }
            />
          ))}
        </FormGroup>
      </Box>
      <Typography variant="body2" color="text.secondary">
        선택된 항목: {checked.length}개 / 전체 {OPTIONS.length}개
      </Typography>
    </Stack>
  )
}
