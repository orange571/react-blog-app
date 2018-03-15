import React from 'react';
import { shallow } from 'enzyme';
import posts from '../fixtures/posts';
import { ViewPostPage } from '../../components/ViewPostPage';

const uid = 'thisismytestuid';
const displayName = "thisismytestname"
const defaultAuthState = { auth: { uid, displayName } };
let  startViewPost, setAsLoading, wrapper, match;

beforeEach(() => {
    const postsData = {};
    posts.forEach(({ id, title, author, body, isReadable, createdAt, uid }) => {
      postsData[id] = { title, author, body, isReadable, createdAt, uid };
    });
    startViewPost = jest.fn();
    setAsLoading = jest.fn();
    match = {params: {id: "1"}};
    wrapper = shallow(
      <ViewPostPage
        startViewPost={startViewPost}
        setAsLoading={setAsLoading}
        post={postsData[1]}
        displayName="thisismytestname"
        match={match}
      />
    );
});

test('should render ViewPostPage', () => {
    expect(wrapper).toMatchSnapshot();
});
