import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

// 페이지에 렌더링된 섹션(<section id>)에서 링크 목록을 만듭니다.
// 섹션 레지스트리(index.js)를 import하면 순환 참조가 생기므로 DOM에서 읽습니다.
const readSectionLinks = () =>
  Array.from(document.querySelectorAll('main section[id]')).map((section) => ({
    id: section.id,
    title: section.querySelector('h2')?.textContent ?? section.id,
  }))

// 버튼으로 여닫는 Drawer 사이드바 + 왼쪽/오른쪽 위치 선택 + 섹션 이동 링크
export default function SidebarSection() {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left')
  const [links, setLinks] = useState([])
  const [pendingTarget, setPendingTarget] = useState(null)

  const openDrawer = () => {
    setLinks(readSectionLinks())
    setOpen(true)
  }

  // 링크 클릭: 사이드바를 먼저 닫고, 닫힘 애니메이션이 끝난 뒤(onExited) 스크롤합니다.
  // 바로 스크롤하면 Drawer가 닫히며 열기 버튼으로 포커스를 되돌릴 때 스크롤이 끊길 수 있습니다.
  const handleLinkClick = (id) => (event) => {
    event.preventDefault()
    setPendingTarget(id)
    setOpen(false)
  }

  const handleExited = () => {
    if (!pendingTarget) return
    document.getElementById(pendingTarget)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', `#${pendingTarget}`)
    setPendingTarget(null)
  }

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          사이드바 위치
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          color="primary"
          value={anchor}
          onChange={(event, value) => value && setAnchor(value)}
          aria-label="사이드바 위치"
        >
          <ToggleButton value="left">왼쪽</ToggleButton>
          <ToggleButton value="right">오른쪽</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" onClick={openDrawer} aria-controls="sidebar-drawer" aria-expanded={open}>
        사이드바 열기
      </Button>
      <Typography variant="body2" color="text.secondary">
        현재 위치: {anchor === 'left' ? '왼쪽' : '오른쪽'} · 메뉴를 누르면 해당 섹션으로 이동합니다.
      </Typography>

      <Drawer
        id="sidebar-drawer"
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        <Box component="nav" aria-label="섹션 바로가기" sx={{ width: 260 }}>
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="h6" component="h2">
              섹션 바로가기
            </Typography>
            <Typography variant="body2" color="text.secondary">
              총 {links.length}개 섹션
            </Typography>
          </Box>
          <Divider />
          <List>
            {links.map((link, i) => (
              <ListItem key={link.id} disablePadding>
                <ListItemButton component="a" href={`#${link.id}`} onClick={handleLinkClick(link.id)}>
                  <ListItemText
                    primary={link.title}
                    secondary={`Section ${String(i + 1).padStart(2, '0')}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => setOpen(false)}>
              닫기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Stack>
  )
}
