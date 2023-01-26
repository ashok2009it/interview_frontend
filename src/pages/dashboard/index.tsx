import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBar from '../../components/Appbar';
import { Fragment, useEffect, useState } from 'react';
import {
  DashboardCount,
  DashboardCountResponse,
  getDashboardCount,
} from '../../api/dashboard';
import { Link, Typography } from '@mui/material';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function DashboardContent() {
  const mdTheme = createTheme();
  const [count, setCount] = useState<DashboardCount>();
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    try {
      const response: DashboardCountResponse = await getDashboardCount();
      if (response.success) {
        setCount(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Fragment>
                    <Typography
                      component='h2'
                      variant='h6'
                      color='primary'
                      gutterBottom
                    >
                      Total Users
                    </Typography>
                    <Typography component='p' variant='h3'>
                      {count?.users}
                    </Typography>
                  </Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Fragment>
                    <Typography
                      component='h2'
                      variant='h6'
                      color='primary'
                      gutterBottom
                    >
                      Total Teams
                    </Typography>
                    <Typography component='p' variant='h3'>
                      {count?.teams}
                    </Typography>
                  </Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
