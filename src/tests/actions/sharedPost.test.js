import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { viewPost, startViewPost } from '../../actions/sharedPost';
import posts from '../fixtures/posts';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const displayName = "thisismytestname"
const defaultAuthState = { auth: { uid, displayName } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
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
      database.ref(`isPublic`).set(publicList).then(() => done());
    });
  });
});


test('should setup viewpost action object', () => {
  const postsData = {};
  posts.forEach(({ id, title, author, body, isReadable, createdAt, uid }) => {
    postsData[id] = { title, author, body, isReadable, createdAt, uid };
  });
  const action = viewPost(postsData[1]);
  expect(action).toEqual({
    type: 'VIEW_POST',
    post: postsData[1]
  });
});

test('should fetch viewpost from firebase', (done) => {
  const postsData = {};
  posts.forEach(({ id, title, author, body, isReadable, createdAt, uid }) => {
    postsData[id] = { title, author, body, isReadable, createdAt, uid };
  });
  const store = createMockStore(defaultAuthState);
  store.dispatch(startViewPost(posts[1].id)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'VIEW_POST',
        post: postsData[2]
      });
      done();
  });
});
