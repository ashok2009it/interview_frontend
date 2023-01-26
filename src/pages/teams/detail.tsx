import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addMemberBody,
  addMemberToTeam,
  getTeam,
  getUsers,
  Team,
  TeamResponse,
  User,
  UsersListResponse,
} from '../../api/teams';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AppBar from '../../components/Appbar';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TeamDetail = () => {
  const mdTheme = createTheme();
  const params = useParams();
  const [team, setTeam] = useState<Team>();
  const [addMemberOpen, setAddMemberOpen] = useState<boolean>(false);
  const [newMemberIds, setNewMemberIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    try {
      const response: UsersListResponse = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTeamDetail();
  }, []);

  const getTeamDetail = async () => {
    if (params.id) {
      try {
        const response: TeamResponse = await getTeam(params.id);
        if (response.success) {
          setTeam(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleModalClose = () => {
    setAddMemberOpen(false);
  };

  const addMember = async () => {
    if (newMemberIds.length > 0 && team) {
      try {
        const body: addMemberBody = {
          team_id: team.id,
          user_id: newMemberIds,
        };
        const response: TeamResponse = await addMemberToTeam(body);
        if (response.success) {
          getTeamDetail();
          setAddMemberOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const removeMember = async (member_id: string) => {
  //   try {
  //     const body: addMemberBody = {
  //       // team_id: team.id,
  //       user_id: newMemberIds,
  //     };
  //     const response: TeamResponse = await addMemberToTeam(body);
  //     if (response.success) {
  //       getTeamDetail();
  //       setAddMemberOpen(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleChange = (event: SelectChangeEvent<typeof newMemberIds>) => {
    const {
      target: { value },
    } = event;

    setNewMemberIds(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar />
        <Dialog
          open={addMemberOpen}
          onClose={handleModalClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Add new Member to team'}
          </DialogTitle>
          <DialogContent>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id='demo-multiple-checkbox-label'>
                Users List
              </InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={newMemberIds}
                onChange={handleChange}
                input={<OutlinedInput label='Tag' />}
                renderValue={(selected) =>
                  selected
                    .map((select) => {
                      let user = users?.find((user) => {
                        return user?.id.toString() === select;
                      });
                      return user?.full_name;
                    })
                    .join(', ')
                }
                MenuProps={MenuProps}
              >
                {users &&
                  users.map((user) => (
                    <MenuItem key={user.uuid} value={user.id.toString()}>
                      <Checkbox
                        checked={newMemberIds.indexOf(user.id.toString()) > -1}
                      />
                      <ListItemText primary={user.full_name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Close</Button>
            <Button
              onClick={addMember}
              autoFocus
              disabled={newMemberIds.length === 0}
            >
              Add member
            </Button>
          </DialogActions>
        </Dialog>
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
          <Card sx={{ width: 1, mt: 3 }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {team?.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                praesentium ab quam dolores natus, impedit dolor nam aperiam
                excepturi voluptates, aut velit harum dolorem officia saepe
                quaerat tempora soluta sint.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                width: 1,
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                size='small'
                onClick={() => {
                  setAddMemberOpen(true);
                }}
              >
                Add new member
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ width: 1, mt: 5 }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                All Team Members
              </Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Team Lead</TableCell>
                    <TableCell>createdAt</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                {team?.users && (
                  <TableBody>
                    {team.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>

                        <TableCell>{user.active ? 'yes' : 'no'}</TableCell>
                        <TableCell>
                          {user.Team_User?.is_team_lead ? 'yes' : 'no'}
                        </TableCell>
                        <TableCell>
                          {moment(user.createdAt)
                            .format('MMMM Do YYYY, h:mm a')
                            .toString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color='primary'
                            component='label'
                            onClick={() => {
                              navigate(`/user/${user.uuid}`);
                            }}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                          <IconButton
                            color='primary'
                            component='label'
                            onClick={() => {}}
                          >
                            <PersonRemoveIcon />
                          </IconButton>
                          <IconButton
                            color='primary'
                            component='label'
                            onClick={() => {}}
                          >
                            <TouchAppIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </CardContent>
          </Card>
          {params.id}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TeamDetail;
