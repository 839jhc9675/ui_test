import SvgIcon from '@mui/material/SvgIcon'

// @mui/icons-material 의존성 없이 쓰는 닫기(X) 아이콘
export default function CloseIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  )
}
