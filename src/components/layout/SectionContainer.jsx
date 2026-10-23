import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// 모든 섹션이 공통으로 쓰는 카드형 래퍼 (번호 + 제목 + 설명 + 내용)
export default function SectionContainer({ id, index, title, description, children }) {
  return (
    <Paper component="section" id={id} variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
      <Box component="header" sx={{ mb: 3 }}>
        {index != null && (
          <Typography variant="overline" color="primary">
            Section {String(index).padStart(2, '0')}
          </Typography>
        )}
        <Typography variant="h5" component="h2" fontWeight={600}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      {children}
    </Paper>
  )
}
