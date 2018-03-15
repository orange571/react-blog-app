import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import ViewPublicPostsPage from '../../components/ViewPublicPostsPage';
import thunk from 'redux-thunk';
import posts from '../fixtures/posts';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const displayName = "thisismytestname"
const defaultAuthState = { auth: { uid, displayName } };
const createMockStore = configureMockStore([thunk]);

test('should fetch the publicposts from firebase', (done) => {
  const postsData = {};
  posts.forEach(({ id, title, author, body, isReadable, createdAt, uid }) => {
    postsData[id] = { title, author, body, isReadable, createdAt, uid };
  });
  const userPosts = {};
  posts.forEach((post) => {
    userPosts[post.id] = post.isReadable;
  });
  const publicList = {};
  posts.forEach((post) => {
    if(post.isReadable){
      publicList[post.id] = {id: post.id};
    }
  })
  database.ref(`users/${uid}/posts`).set(userPosts).then(() => {
    database.ref(`posts`).set(postsData).then(() => {
      database.ref(`isPublic`).set(publicList).then(() => {
        let wrapper = shallow(<ViewPublicPostsPage />);
        setTimeout(() => {
          expect(wrapper.state().posts).toEqual([posts[1]]);
          expect(wrapper).toMatchSnapshot();
          done();
        }, 1000);
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));

},10000);
