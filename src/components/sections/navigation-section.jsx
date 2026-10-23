import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const MENUS = ['홈', '소개', '서비스', '연락처'];

/**
 * NavigationSection 컴포넌트
 *
 * AppBar 네비게이션: sm 이상은 메뉴 버튼, 그보다 좁으면 햄버거 메뉴
 *
 * Props: 없음
 *
 * Example usage:
 * <NavigationSection />
 */
function NavigationSection() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelect = (menu) => {
    setAnchorEl(null);
    alert(`${menu} 메뉴를 클릭했습니다.`);
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          { MENUS.map((menu) => (
            <Button key={ menu } color="inherit" onClick={ () => handleSelect(menu) }>
              { menu }
            </Button>
          )) }
        </Box>

        <IconButton
          color="inherit"
          edge="end"
          aria-label="메뉴 열기"
          aria-controls={ anchorEl ? 'navigation-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ anchorEl ? 'true' : undefined }
          onClick={ (event) => setAnchorEl(event.currentTarget) }
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="navigation-menu"
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ () => setAnchorEl(null) }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          { MENUS.map((menu) => (
            <MenuItem key={ menu } onClick={ () => handleSelect(menu) }>
              { menu }
            </MenuItem>
          )) }
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationSection;
