import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

/** 닫힌 방법(reason)별 안내 문구 — backdropClick, escapeKeyDown은 MUI가 넘겨주는 값 */
const RESULT_TEXT = {
  confirm: '확인 버튼으로 닫았습니다.',
  cancel: '취소 버튼으로 닫았습니다.',
  close: '닫기(X) 버튼으로 닫았습니다.',
  backdropClick: '배경을 클릭해서 닫았습니다.',
  escapeKeyDown: 'ESC 키로 닫았습니다.',
};

/**
 * ModalSection 컴포넌트
 *
 * 버튼으로 여는 Dialog: 확인/취소, X 버튼, 배경 클릭으로 닫기
 *
 * Props: 없음
 *
 * Example usage:
 * <ModalSection />
 */
function ModalSection() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');

  const handleClose = (reason) => {
    setOpen(false);
    setResult(reason);
  };

  return (
    <Stack spacing={ 2 } sx={{ alignItems: 'flex-start' }}>
      <Button variant="contained" onClick={ () => setOpen(true) }>
        모달 열기
      </Button>
      <Typography variant="body2" color="text.secondary">
        결과: { RESULT_TEXT[result] ?? '(아직 열지 않음)' }
      </Typography>

      <Dialog
        open={ open }
        onClose={ (event, reason) => handleClose(reason) }
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle id="modal-title" sx={{ pr: 6 }}>
          변경 사항 저장
        </DialogTitle>
        <IconButton
          aria-label="닫기"
          onClick={ () => handleClose('close') }
          sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="modal-description">
            작성 중인 내용을 저장하시겠습니까? 저장하지 않으면 변경 사항이 사라집니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => handleClose('cancel') }>취소</Button>
          <Button variant="contained" onClick={ () => handleClose('confirm') }>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default ModalSection;
