import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const MENUS = ['홈', '소개', '상품', '연락처', '설정']

// flexbox로 직접 만든 네비게이션: 로고(왼쪽) ↔ 메뉴들(오른쪽) 양 끝 정렬
export default function FlexNavigationSection() {
  const [active, setActive] = useState(MENUS[0])

  const handleClick = (menu) => (event) => {
    event.preventDefault()
    setActive(menu)
  }

  return (
    <Stack spacing={1.5}>
      {/* 큰 네비게이션 박스: 가로 전체, 높이 60px */}
      <Box
        component="nav"
        aria-label="Flex 네비게이션"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 60,
          px: 2.5,
          bgcolor: '#2d3748',
          borderRadius: 1,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* 1. 로고 박스 */}
        <Box sx={{ flexShrink: 0, color: '#ffffff', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
          MyWebsite
        </Box>

        {/* 2. 메뉴들 박스: 항목 간격 15px, 좁은 화면에서는 가로 스크롤 */}
        <Box
          component="ul"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            m: 0,
            ml: 2,
            p: 0,
            listStyle: 'none',
            minWidth: 0,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {MENUS.map((menu) => (
            <Box component="li" key={menu} sx={{ flexShrink: 0 }}>
              <Box
                component="a"
                href="#"
                onClick={handleClick(menu)}
                aria-current={active === menu ? 'page' : undefined}
                sx={{
                  display: 'block',
                  py: 0.5,
                  color: active === menu ? '#ffffff' : '#cbd5e0',
                  fontSize: 16,
                  fontWeight: active === menu ? 600 : 400,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#ffffff' },
                  '&:focus-visible': { color: '#ffffff', outline: '2px solid #ffffff', outlineOffset: 2, borderRadius: 0.5 },
                }}
              >
                {menu}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary">
        선택된 메뉴: {active}
      </Typography>
    </Stack>
  )
}
