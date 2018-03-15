import React from 'react';
import { shallow } from 'enzyme';
import posts from '../fixtures/posts';
import PublicPostListItem from '../../components/PublicPostListItem';

test('should render PublicPostListItem correctly', () => {
  const wrapper = shallow(<PublicPostListItem {...posts[0]} />);
  expect(wrapper).toMatchSnapshot();
});
