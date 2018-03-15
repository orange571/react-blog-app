import React from 'react';
import { shallow } from 'enzyme';
import PublicPostsList from '../../components/PublicPostsList';
import posts from '../fixtures/posts';

test('should render PublicPostList with posts', () => {
  const wrapper = shallow(<PublicPostsList posts={posts} />);
  expect(wrapper).toMatchSnapshot();
});
