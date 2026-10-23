import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * PageLayout 컴포넌트
 *
 * 네비게이션 없는 단일 페이지 레이아웃: 제목 + 섹션 목록
 * 바깥 중앙정렬과 Container는 App.jsx가 담당합니다.
 *
 * Props:
 * @param {string} title - 페이지 제목 [Required]
 * @param {string} subtitle - 제목 아래 설명 문구 [Optional]
 * @param {node} children - 제목 아래에 세로로 쌓을 섹션들 [Optional]
 *
 * Example usage:
 * <PageLayout title="UI Test" subtitle="설명">
 *   <SectionContainer title="Button">...</SectionContainer>
 * </PageLayout>
 */
function PageLayout({ title, subtitle, children }) {
  return (
    <Box component="main">
      <Box component="header" sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography variant="h4" component="h1" fontWeight={ 700 } gutterBottom>
          { title }
        </Typography>
        { subtitle && (
          <Typography variant="body1" color="text.secondary">
            { subtitle }
          </Typography>
        ) }
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
        { children }
      </Box>
    </Box>
  );
}

export default PageLayout;
