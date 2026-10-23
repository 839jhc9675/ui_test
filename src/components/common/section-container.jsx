import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/**
 * SectionContainer 컴포넌트
 *
 * 모든 섹션이 공통으로 쓰는 카드형 래퍼 (번호 + 제목 + 설명 + 내용)
 *
 * Props:
 * @param {string} id - section 요소의 id (바로가기 링크 대상) [Required]
 * @param {number} index - 섹션 번호, 'Section 01' 형태로 표시 [Optional]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 제목 아래 설명 문구 [Optional]
 * @param {node} children - 섹션 본문 [Optional]
 *
 * Example usage:
 * <SectionContainer id="button" index={ 1 } title="Button" description="버튼 UI">
 *   <ButtonSection />
 * </SectionContainer>
 */
function SectionContainer({ id, index, title, description, children }) {
  return (
    <Paper component="section" id={ id } variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
      <Box component="header" sx={{ mb: 3 }}>
        { index != null && (
          <Typography variant="overline" color="primary">
            Section { String(index).padStart(2, '0') }
          </Typography>
        ) }
        <Typography
          variant="h5"
          component="h2"
          fontWeight={ 600 }
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, lineHeight: 1.3 }}
        >
          { title }
        </Typography>
        { description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            { description }
          </Typography>
        ) }
      </Box>
      { children }
    </Paper>
  );
}

export default SectionContainer;
