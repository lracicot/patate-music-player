import Axios from 'axios';


function loginSuccess(accessToken) {
  return {
    type: 'LOGIN_SUCCESS',
    accessToken,
  };
}

function formError(error) {
  return {
    type: 'FORM_ERROR',
    error,
  };
}

export function register(username, password) {
  return async (dispatch) => {
    const response = await Axios.post('http://localhost:3001/api/register', {
      username,
      password,
    });

    if (response.data.error) {
      return dispatch(formError(response.data.error));
    }

    return dispatch(loginSuccess(response.data.token));
  };
}

export function login(username, password) {
  return async (dispatch) => {
    const response = await Axios.post('http://localhost:3001/api/login', {
      username,
      password,
    });

    if (response.data.error) {
      return dispatch(formError(response.data.error));
    }

    return dispatch(loginSuccess(response.data.token));
  };
}
