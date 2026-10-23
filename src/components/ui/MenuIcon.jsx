import SvgIcon from '@mui/material/SvgIcon'

// @mui/icons-material 의존성 없이 쓰는 햄버거 아이콘
export default function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" />
    </SvgIcon>
  )
}
