import React from 'react';
import { shallow } from 'enzyme';
import posts from '../fixtures/posts';
import PostListItem from '../../components/PostListItem';

test('should render PostListItem correctly', () => {
  const wrapper = shallow(<PostListItem {...posts[0]} />);
  expect(wrapper).toMatchSnapshot();
});
