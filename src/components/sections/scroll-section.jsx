import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ITEMS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `콘텐츠 ${i + 1}`,
  description: `스크롤 동작을 확인하기 위한 ${i + 1}번째 항목입니다.`,
}));

/** 이 값(px)보다 아래로 스크롤하면 Top 버튼이 나타납니다. */
const SHOW_TOP_BUTTON_AT = 100;

/**
 * ScrollSection 컴포넌트
 *
 * 고정 높이(300px) 스크롤 컨테이너 + 스크롤 위치에 따라 나타나는 Top 버튼 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <ScrollSection />
 */
function ScrollSection() {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleScroll = (event) => {
    const el = event.currentTarget;
    setScrollTop(el.scrollTop);
    setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
  };

  const scrollToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Stack spacing={ 1 }>
      { /* Top 버튼이 스크롤에 같이 밀려 올라가지 않도록, 스크롤 영역 바깥 래퍼에 배치 */ }
      <Box sx={{ position: 'relative' }}>
        <Paper
          ref={ containerRef }
          variant="outlined"
          onScroll={ handleScroll }
          sx={{ height: 300, overflowY: 'auto' }}
        >
          <List disablePadding>
            { ITEMS.map((item) => (
              <ListItem key={ item.id } divider>
                <ListItemText primary={ item.title } secondary={ item.description } />
              </ListItem>
            )) }
          </List>
        </Paper>
        <Zoom in={ scrollTop > SHOW_TOP_BUTTON_AT }>
          <Fab
            size="small"
            color="primary"
            aria-label="맨 위로 이동"
            onClick={ scrollToTop }
            sx={{ position: 'absolute', right: 16, bottom: 16 }}
          >
            <ArrowUpwardIcon />
          </Fab>
        </Zoom>
      </Box>
      <LinearProgress variant="determinate" value={ progress } aria-label="스크롤 진행률" />
      <Typography variant="body2" color="text.secondary">
        스크롤 위치: { Math.round(scrollTop) }px · 진행률: { Math.round(progress) }%
      </Typography>
    </Stack>
  );
}

export default ScrollSection;
