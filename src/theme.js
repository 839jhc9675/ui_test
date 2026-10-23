import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f7f8fa', paper: '#ffffff' },
  },
  typography: {
    fontFamily: ['Roboto', 'Pretendard', 'Apple SD Gothic Neo', 'sans-serif'].join(','),
  },
  shape: { borderRadius: 8 },
});

export default theme;
