import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { initMessageListener } from 'redux-state-sync';

const middlewares = [thunk];

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  initMessageListener(store);

  return store;
}
