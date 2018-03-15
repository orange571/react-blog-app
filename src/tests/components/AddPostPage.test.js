import React from 'react';
import { shallow } from 'enzyme';
import { AddPostPage } from '../../components/AddPostPage';
import posts from '../fixtures/posts';

let startAddPost, history, wrapper;

beforeEach(() => {
  startAddPost = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddPostPage startAddPost={startAddPost} history={history} />);
});

test('should render AddPostPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('PostForm').prop('onSubmit')(posts[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddPost).toHaveBeenLastCalledWith(posts[1]);
});
