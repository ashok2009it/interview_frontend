/* eslint-disable -- TODO: fix eslint errors */

export function getApiToken() {
  try {
    return JSON.parse(localStorage.getItem('INTERVIEW_TOKEN') ?? '');
  } catch (err) {
    localStorage.clear();
  }
}

export function capitalizeFirstLetter(string: string) {
  if (typeof string === 'undefined') return string;

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getAPIErrorMessage(
  err: any,
  sendCustom = true,
  customMessage = ''
) {
  if (customMessage) {
    return customMessage;
  }
  let message = 'Something went wrong. Please contact support';
  if (sendCustom) {
    if (err?.errors?.length > 0) {
      message = '';
      err.errors.forEach((error: any) => {
        message += error?.msg + ' ';
      });
    } else if (err.message) {
      message = err.message;
    }
  }

  return message;
}
