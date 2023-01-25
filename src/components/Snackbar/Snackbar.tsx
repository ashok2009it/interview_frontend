/* eslint-disable -- TODO: fix eslint errors */

import { Alert, Icon, IconButton, Snackbar } from '@mui/material';

const SnackbarComponent = ({
  isActive,
  message,
  hideDuration,
  type,
  handleClose,
}: any) => {
  return (
    <Snackbar
      onClose={handleClose}
      open={isActive}
      autoHideDuration={hideDuration}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      itemType={'success'}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: type === 'success' ? '#03a95b' : '#f04e52',
          color: '#ffffff',
          fontWeight: 500,
        },
        '& .MuiAlert-icon': {
          color: '#ffffff',
        },
        '& .MuiSvgIcon-root': {
          color: '#ffffff',
        },
      }}
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>,
      ]}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
