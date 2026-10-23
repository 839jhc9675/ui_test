import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const VARIANTS = ['contained', 'outlined', 'text']
const COLORS = ['primary', 'secondary', 'error']

// variant(행) × color(열) 조합을 모두 보여주는 버튼 섹션
export default function ButtonSection() {
  const handleClick = (variant, color) => {
    alert(`${variant} / ${color} 버튼을 클릭했습니다.`)
  }

  return (
    <Stack spacing={3}>
      {VARIANTS.map((variant) => (
        <Box key={variant}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {variant}
          </Typography>
          <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {COLORS.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {color}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}
