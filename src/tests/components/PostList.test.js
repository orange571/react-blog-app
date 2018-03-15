import React from 'react';
import { shallow } from 'enzyme';
import { PostList } from '../../components/PostList';
import posts from '../fixtures/posts';

test('should render PostList with posts', () => {
  const wrapper = shallow(<PostList posts={posts} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostList with empty message', () => {
  const wrapper = shallow(<PostList posts={[]} />);
  expect(wrapper).toMatchSnapshot();
});
