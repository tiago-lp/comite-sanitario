import Api from '../services/api';
import { createNotification } from './notificationActions';

export const LOGIN_ASYNC_REQUEST_STARTED = 'LOGIN_ASYNC_REQUEST_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginAsyncRequestStarted = () => ({
  type: LOGIN_ASYNC_REQUEST_STARTED
});

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...data
  }
});

const loginFailed = () => ({
  type: LOGIN_FAILED,
});

export const loginRequest = (body) => {
  return dispatch => {
    dispatch(loginAsyncRequestStarted());
    Api.post('token/', body)
    .then(response => {
      dispatch(loginSuccess({
        token: response.data.access,
        user: {
          username: body.username,
        },
      }))
    })
    .catch(error => {
      dispatch(createNotification({
        variant: 'error',
        message: 'Erro ao fazer login'
      }));
      dispatch(loginFailed());
    })
  };
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutRequest = (body) => {
  return dispatch => {
    dispatch(loginAsyncRequestStarted());
    dispatch(logoutSuccess());
  };
};
