import postsReducer from '../../reducers/posts';
import posts from '../fixtures/posts';

test('should set default state', () => {
  const state = postsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove post by id', () => {
  const action = {
    type: 'REMOVE_POST',
    id: posts[1].id
  };
  const state = postsReducer(posts, action);
  expect(state).toEqual([posts[0], posts[2]]);
});

test('should not remove posts if id not found', () => {
  const action = {
    type: 'REMOVE_POST',
    id: '-1'
  };
  const state = postsReducer(posts, action);
  expect(state).toEqual(posts);
});

test('should add an post', () => {
  const post = {
    id: '4',
    title: 'Laptop',
    body: 'Should I buy a laptop?',
    createdAt: 20000,
    author: 'thisismytestname',
    uid: 'thisismytestuid'
  };
  const action = {
    type: 'ADD_POST',
    post
  };
  const state = postsReducer(posts, action);
  expect(state).toEqual([...posts, post]);
});

test('should edit an post', () => {
  const title = 'Test title';
  const action = {
    type: 'EDIT_POST',
    id: posts[1].id,
    updates: {
      title
    }
  };
  const state = postsReducer(posts, action);
  expect(state[1].title).toBe(title);
});

test('should not edit an post if id not found', () => {
  const title = 'Testing not found post';
  const action = {
    type: 'EDIT_POST',
    id: '-1',
    updates: {
      title
    }
  };
  const state = postsReducer(posts, action);
  expect(state).toEqual(posts);
});

test('should set posts', () => {
  const action = {
    type: 'SET_POSTS',
    posts: [posts[1]]
  };
  const state = postsReducer(posts, action);
  expect(state).toEqual([posts[1]]);
});
