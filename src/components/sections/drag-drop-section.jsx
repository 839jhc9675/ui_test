import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ZONES = [
  { id: 'todo', label: '할 일' },
  { id: 'done', label: '완료 (드롭 영역)' },
];

const INITIAL_ITEMS = [
  { id: 'design', label: '디자인 시안 만들기', zone: 'todo' },
  { id: 'api', label: 'API 연동하기', zone: 'todo' },
  { id: 'test', label: '테스트 코드 작성', zone: 'todo' },
  { id: 'deploy', label: '배포하기', zone: 'todo' },
];

/**
 * DragDropSection 컴포넌트
 *
 * HTML5 Drag and Drop API로 아이템을 영역 사이에서 이동하는 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <DragDropSection />
 */
function DragDropSection() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [draggingId, setDraggingId] = useState(null);
  const [overZone, setOverZone] = useState(null);

  const handleDragStart = (id) => (event) => {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
    setDraggingId(id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverZone(null);
  };

  /** dragover에서 preventDefault를 해야 drop 이벤트가 발생합니다. */
  const handleDragOver = (zone) => (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setOverZone(zone);
  };

  /** 영역 안의 자식 요소로 들어갈 때도 dragleave가 발생하므로, 진짜로 벗어났을 때만 해제합니다. */
  const handleDragLeave = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setOverZone(null);
  };

  const handleDrop = (zone) => (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, zone } : item)));
    setDraggingId(null);
    setOverZone(null);
  };

  return (
    <Grid container spacing={ 2 }>
      { ZONES.map((zone) => {
        const zoneItems = items.filter((item) => item.zone === zone.id);
        const isOver = overZone === zone.id;

        return (
          <Grid key={ zone.id } size={{ xs: 12, sm: 6 }}>
            <Box
              onDragOver={ handleDragOver(zone.id) }
              onDragLeave={ handleDragLeave }
              onDrop={ handleDrop(zone.id) }
              sx={{
                height: '100%',
                minHeight: 220,
                p: 2,
                borderRadius: 1,
                border: '2px dashed',
                borderColor: isOver ? 'primary.main' : 'divider',
                bgcolor: isOver ? 'action.hover' : 'background.default',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                { zone.label } · { zoneItems.length }개
              </Typography>
              <Stack spacing={ 1 }>
                { zoneItems.map((item) => (
                  <Paper
                    key={ item.id }
                    draggable
                    onDragStart={ handleDragStart(item.id) }
                    onDragEnd={ handleDragEnd }
                    elevation={ draggingId === item.id ? 0 : 1 }
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'grab',
                      userSelect: 'none',
                      opacity: draggingId === item.id ? 0.4 : 1,
                      transition: 'opacity 0.15s, box-shadow 0.15s',
                      '&:hover': { boxShadow: 4 },
                      '&:active': { cursor: 'grabbing' },
                    }}
                  >
                    { item.label }
                  </Paper>
                )) }
                { zoneItems.length === 0 && (
                  <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 4 }}>
                    여기로 아이템을 끌어다 놓으세요
                  </Typography>
                ) }
              </Stack>
            </Box>
          </Grid>
        );
      }) }
    </Grid>
  );
}

export default DragDropSection;
