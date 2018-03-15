import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddPost,
  addPost,
  editPost,
  startEditPost,
  removePost,
  startRemovePost,
  setPosts,
  startSetPosts
} from '../../actions/posts';
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

test('should setup remove post action object', () => {
  const action = removePost({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_POST',
    id: '123abc'
  });
});


test('should remove post from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = posts[2].id;
  store.dispatch(startRemovePost({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_POST',
      id
    });
    return database.ref(`posts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit post action object', () => {
  const action = editPost('123abc', { title: 'New title value' });
  expect(action).toEqual({
    type: 'EDIT_POST',
    id: '123abc',
    updates: {
      title: 'New title value'
    }
  });
});

test('should edit post  private to public from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = posts[0].id;
  const updates = { ...posts[0], body: "new body test", isReadable: true };
  store.dispatch(startEditPost(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_POST',
      id,
      updates
    });
    return database.ref(`posts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().body).toBe(updates.body);
    return database.ref(`isPublic`).orderByChild("id").equalTo(id).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        expect(childSnapshot.val()).toEqual({
          id
        });
        done();
      })
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));;
});


test('should edit post  public to private from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = posts[1].id;
  const updates = { ...posts[1], body: "new body test", isReadable: false };
  store.dispatch(startEditPost(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_POST',
      id,
      updates
    });
    return database.ref(`posts/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().body).toBe(updates.body);
    return database.ref(`isPublic`).orderByChild("id").equalTo(id).once('value').then((snapshot) => {
      expect(snapshot.val()).toBe(null);
      done();
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));;
});

test('should setup add post action object with provided values', () => {
  const action = addPost(posts[2]);
  expect(action).toEqual({
    type: 'ADD_POST',
    post: posts[2]
  });
});

test('should add pulic post to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const postData = {
    title: 'Oranges',
    body: "Oranges are orange",
    isReadable: true,
    createdAt: 1000,
    author: "thisismytestname",
  };

  store.dispatch(startAddPost(postData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_POST',
      post: {
        id: expect.any(String),
        ...postData,
        uid
      }
    });
    return database.ref(`posts/${actions[0].post.id}`).once('value');
  }).then((snapshot) => {
    const actions = store.getActions();
    const postIdKey = snapshot.key;
    expect(snapshot.val()).toEqual({...postData, uid});
    return database.ref(`isPublic`).orderByChild("id").equalTo(postIdKey).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        expect(childSnapshot.val()).toEqual({
          id:postIdKey
        })
      })
      return database.ref(`users/${uid}/posts/${postIdKey}`).once('value').then((snapshot) => {
        expect(snapshot.val()).toBe(true);
        done();
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));
});

test('should add private post to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const postData = {
    title: 'Oranges',
    body: "Oranges are orange",
    isReadable: false,
    createdAt: 1000,
    author: "thisismytestname",
  };

  store.dispatch(startAddPost(postData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_POST',
      post: {
        id: expect.any(String),
        ...postData,
        uid
      }
    });
    return database.ref(`posts/${actions[0].post.id}`).once('value');
  }).then((snapshot) => {
    const postIdKey = snapshot.key;
    expect(snapshot.val()).toEqual({...postData, uid});
    return database.ref(`isPublic`).orderByChild("id").equalTo(postIdKey).once('value').then((snapshot) => {
      expect(snapshot.val()).toBe(null);
      return database.ref(`users/${uid}/posts/${postIdKey}`).once('value').then((snapshot) => {
        expect(snapshot.val()).toBe(false);
        done();
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));
});

test('should add post with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const postDefaults = {
    title: '',
    body: '',
    createdAt: 0,
    isReadable: false,
    author: '',
  };
  store.dispatch(startAddPost({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_POST',
      post: {
        id: expect.any(String),
        ...postDefaults,
        uid
      }
    });
    return database.ref(`posts/${actions[0].post.id}`).once('value');
  }).then((snapshot) => {
    const postIdKey = snapshot.key;
    expect(snapshot.val()).toEqual({...postDefaults, uid});
    return database.ref(`users/${uid}/posts/${postIdKey}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toBe(false);
      done();
    }).catch(error => console.log(error));
  }).catch(error => console.log(error));
});

test('should setup set post action object with data', () => {
  const action = setPosts(posts);
  expect(action).toEqual({
    type: 'SET_POSTS',
    posts
  });
});

test('should fetch the posts from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetPosts()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_POSTS',
        posts
      });
      done();
  });
});
