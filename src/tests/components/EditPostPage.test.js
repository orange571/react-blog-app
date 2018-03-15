import React from 'react';
import { shallow } from 'enzyme';
import posts from '../fixtures/posts';
import { EditPostPage } from '../../components/EditPostPage';

let startEditPost, startRemovePost, history, wrapper;

beforeEach(() => {
  startEditPost = jest.fn();
  startRemovePost = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditPostPage
      startEditPost={startEditPost}
      startRemovePost={startRemovePost}
      history={history}
      post={posts[2]}
    />
  );
});

test('should render EditPostPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditPost', () => {
  wrapper.find('PostForm').prop('onSubmit')(posts[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditPost).toHaveBeenLastCalledWith(posts[2].id, posts[2]);
});

test('should handle startRemovePost', () => {
  wrapper.find('PostForm').prop('onRemove')();
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemovePost).toHaveBeenLastCalledWith({
    id: posts[2].id
  });
});
