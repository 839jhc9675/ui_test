import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Stage 컴포넌트
 *
 * 데모 하나를 담는 고정 높이 무대 (트랜지션 중 레이아웃이 흔들리지 않도록)
 *
 * Props:
 * @param {string} title - 무대 위에 표시할 제목 [Required]
 * @param {function} stageRef - 무대 요소를 받는 ref 콜백 (Slide의 container 지정용) [Optional]
 * @param {node} children - 무대 안에 보여줄 데모 요소 [Optional]
 *
 * Example usage:
 * <Stage title="Fade · 투명도" stageRef={ setSlideStage }>
 *   <DemoBox label="Fade" />
 * </Stage>
 */
function Stage({ title, children, stageRef }) {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        { title }
      </Typography>
      <Box
        ref={ stageRef }
        sx={{
          height: 140,
          borderRadius: 1,
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          mb: 1,
        }}
      >
        { children }
      </Box>
    </Box>
  );
}

export default Stage;
