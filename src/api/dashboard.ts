import { _request } from './request';

export interface DashboardCountResponse {
  success: boolean;
  message: string;
  data: DashboardCount;
}

export type DashboardCount = {
  users: number;
  teams: number;
};

export const getDashboardCount = async () => {
  const responseBody = await _request<DashboardCountResponse>({
    url: `users/dashboard`,
    method: 'GET',
  });
  return responseBody;
};
