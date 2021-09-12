import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';
import sessionReducer from './sessionReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  notification: notificationReducer,
});

export default withReduxStateSync(rootReducer);
