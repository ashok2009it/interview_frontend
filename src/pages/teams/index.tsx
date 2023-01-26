import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { getTeams, Team, TeamsListResponse } from '../../api/teams';
import AppBar from '../../components/Appbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
const Teams = () => {
  const mdTheme = createTheme();

  const [teams, setTeams] = useState<Team[]>();
  const navigate = useNavigate();
  useEffect(() => {
    getTeamsList();
  }, []);

  const getTeamsList = async () => {
    try {
      const response: TeamsListResponse = await getTeams();
      if (response.success) {
        setTeams(response.data);
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
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Fragment>
                <Typography
                  component='h2'
                  variant='h6'
                  color='primary'
                  gutterBottom
                >
                  All teams
                </Typography>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Total Users</TableCell>
                      <TableCell>createdAt</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {teams && (
                    <TableBody>
                      {teams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell>{team.id}</TableCell>
                          <TableCell>{team.name}</TableCell>
                          <TableCell>{team.users.length}</TableCell>
                          <TableCell>
                            {moment(team.createdAt)
                              .format('MMMM Do YYYY, h:mm a')
                              .toString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='label'
                              onClick={() => {
                                navigate(`/team/${team.uuid}`);
                              }}
                            >
                              <RemoveRedEyeIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </Fragment>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Teams;
