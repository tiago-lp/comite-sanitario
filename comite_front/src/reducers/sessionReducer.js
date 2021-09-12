import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGIN_ASYNC_REQUEST_STARTED
} from '../actions/sessionActions';

const initialState = {
  loading: false,
  loggedIn: false,
  sessionToken: '',
  loggedUser: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ASYNC_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS: {
      if (!action.payload.token) {
        return {
          ...initialState,
        };
      }
      const currentStep = localStorage.getItem('currentStep');
      if (!currentStep) {
        localStorage.setItem('currentStep', 0);
      }
      return {
        ...state,
        loggedIn: true,
        sessionToken: action.payload.token,
        loggedUser: { 
          ...action.payload.user,
        }
      }
    }

    case LOGIN_FAILED:
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default sessionReducer;
