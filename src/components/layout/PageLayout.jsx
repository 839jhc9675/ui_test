import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// 네비게이션 없는 단일 페이지 레이아웃: 제목 + 섹션 목록
export default function PageLayout({ title, subtitle, children }) {
  return (
    <Box component="main" sx={{ minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Box component="header" sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
          {children}
        </Box>
      </Container>
    </Box>
  )
}
