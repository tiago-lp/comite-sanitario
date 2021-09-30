import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';
import sessionReducer from './sessionReducer';
import notificationReducer from './notificationReducer';
import peopleReducer from './peopleReducer';
import donationReducer from './donationReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  notification: notificationReducer,
  people: peopleReducer,
  donation: donationReducer,
});

export default withReduxStateSync(rootReducer);
