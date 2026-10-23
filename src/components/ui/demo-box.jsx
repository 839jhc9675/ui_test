import Box from '@mui/material/Box';

/**
 * DemoBox 컴포넌트
 *
 * 애니메이션 대상이 되는 공통 사각형
 *
 * Props:
 * @param {string} label - 사각형 가운데에 표시할 텍스트 [Required]
 * @param {string} color - 배경색 (MUI 팔레트 경로) [Optional, 기본값: 'primary.main']
 * @param {object} sx - 추가로 덮어쓸 스타일 (예: animation) [Optional]
 *
 * Example usage:
 * <DemoBox label="Fade" color="secondary.main" sx={{ animation: 'none' }} />
 */
function DemoBox({ label, color = 'primary.main', sx }) {
  return (
    <Box
      sx={{
        width: 88,
        height: 88,
        borderRadius: 2,
        bgcolor: color,
        color: 'common.white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        boxShadow: 2,
        ...sx,
      }}
    >
      { label }
    </Box>
  );
}

export default DemoBox;
