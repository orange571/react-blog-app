import sharedPostReducer from '../../reducers/sharedPost';
import posts from '../fixtures/posts';

test('should set default state', () => {
  const state = sharedPostReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    isLoading: "not started"
  });
});

test('should set as loading', () => {
  const action = {
    type: 'IS_LOADING'
  };
  const state = sharedPostReducer(undefined, action);
  expect(state).toEqual({
    isLoading: "loading"
  });
});

test('should set post', () => {
  const action = {
    type: 'VIEW_POST',
    post: posts[1]
  };
  const state = sharedPostReducer(posts[1], action);
  expect(state).toEqual({
    isLoading: "finished",
    ...posts[1]
  });
});
