import { Role } from './auth';
import { _request } from './request';

export interface TeamsListResponse {
  success: boolean;
  message: string;
  data: Team[];
}

export interface TeamResponse {
  success: boolean;
  message: string;
  data: Team;
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data: User[];
}

export type Team = {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  users: User[];
};

export type User = {
  id: number;
  uuid: string;
  full_name: string;
  email: string;
  active: boolean;
  is_email_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  Team_User?: TeamUser;
  roles: Role[];
  teams: Team[];
};

export interface TeamUser {
  team_id: number;
  user_id: number;
  is_team_lead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type addMemberBody = {
  team_id: number;
  user_id: string[];
};

export const getTeams = async () => {
  const responseBody = await _request<TeamsListResponse>({
    url: `teams/list`,
    method: 'GET',
  });
  return responseBody;
};

export const getTeam = async (uuid: string) => {
  const responseBody = await _request<TeamResponse>({
    url: `teams/${uuid}`,
    method: 'GET',
  });
  return responseBody;
};

export const addMemberToTeam = async (body: addMemberBody) => {
  const responseBody = await _request<TeamResponse>({
    url: `teams/assign-member`,
    method: 'POST',
    body,
  });
  return responseBody;
};

export const getUsers = async () => {
  const responseBody = await _request<UsersListResponse>({
    url: `users/list`,
    method: 'GET',
  });
  return responseBody;
};
