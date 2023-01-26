import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/Appbar';

const UserDetail = () => {
  const mdTheme = createTheme();
  const params = useParams();
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar />
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {params.id}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserDetail;
