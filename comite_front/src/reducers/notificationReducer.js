import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '../actions/notificationActions';

const initialState = {
  data: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return {
        data: [...state.data, action.payload]
      };
    case DELETE_NOTIFICATION:
      return {
        data: state.data.filter(({ id }) => id !== action.id)
      };
    case CLEAR_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;