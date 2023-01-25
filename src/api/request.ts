/* eslint-disable -- TODO: fix eslint errors */
import { getApiToken } from '../helpers/helper';

export const BASE_URL = process.env.REACT_APP_BASE_URL + 'api/';

type GetProps = {
  method: 'GET' | 'POST';
  url: string;
  additionalHeaders?: Record<string, string>;
  useRelativeUrl?: boolean;
  body?: Record<string, any>;
  useAuth?: boolean;
};

type PostProps = GetProps & {
  body: Record<string, any>;
};

function debugLog(...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
}

function logout() {
  localStorage.clear();
  location.replace('/');
}

export async function _request<T>({
  method,
  url,
  additionalHeaders = {},
  body,
  useRelativeUrl = true,
}: GetProps | PostProps): Promise<T> {
  let reqBody = { ...body };

  let DEFAULT_HEADERS: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const token = getApiToken();
  if (token) {
    DEFAULT_HEADERS = {
      ...DEFAULT_HEADERS,
      Authorization: 'Bearer ' + token,
    };
  }

  let headers = { ...DEFAULT_HEADERS, ...additionalHeaders };

  debugLog(`Request body for ${url}`, reqBody);

  const payload = JSON.stringify(reqBody || {});
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10000);

  const response = await fetch(useRelativeUrl ? `${BASE_URL}${url}` : url, {
    method,
    headers,
    signal: controller.signal,
    ...(method === 'GET' ? {} : { body: payload }),
  });
  const responseBody =
    response.headers.get('content-type') ===
      'application/json; charset=utf-8' ||
    response.headers.get('content-type') === 'application/json'
      ? await response.json()
      : response.headers.get('content-type') === 'application/pdf'
      ? await response.blob()
      : await response.text();

  if (response.status === 401) {
    const REFRESH_TOKEN_ERROR_MESSAGES = [
      'No/Invalid Token, Auth is denied.',
      'User is deleted/banned',
      'User is not active',
      'User access is denied',
      'User does not exists',
      'System could not authenticate user',
    ];

    if (REFRESH_TOKEN_ERROR_MESSAGES.includes(responseBody.message)) {
      logout();
      // auth.signout();
      // navigate('/');
    }
  }
  if (response.status >= 300) {
    throw responseBody;
  }

  return responseBody;
}
