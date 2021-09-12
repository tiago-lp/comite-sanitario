import { get } from 'lodash';

export const getToken = () => {
  const loginState = JSON.parse(localStorage.getItem('state'));
  return get(loginState, 'session.sessionToken', '');
};

export default getToken;
