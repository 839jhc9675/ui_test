import SvgIcon from '@mui/material/SvgIcon'

// @mui/icons-material 의존성 없이 쓰는 위쪽 화살표 아이콘
export default function ArrowUpIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z" />
    </SvgIcon>
  )
}
