import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  maxHeight: 500,
  overflowY: 'auto'
};
type Props = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

export const ModalDefault = ({ children, open, handleClose }: Props) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Box sx={{ ...style, width: matchDownMD ? '60%' : '90%' }}>{children}</Box>
      </Modal>
    </div>
  );
};
