import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from '../reducers/posts';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import sharedPostReducer from '../reducers/sharedPost';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      posts: postsReducer,
      filters: filtersReducer,
      auth: authReducer,
      sharedPost: sharedPostReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
