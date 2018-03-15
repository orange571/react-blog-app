import uuid from 'uuid';
import database from '../firebase/firebase';
import moment from 'moment'

// ADD_POST
export const addPost = (post) => ({
  type: 'ADD_POST',
  post
});

export const startAddPost = (postData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      body = '',
      createdAt = 0,
      isReadable = false,
      author = '',
    } = postData;
    const post = { title, body, createdAt, isReadable, author, uid };

    return database.ref(`posts`).push(post).then((ref) => {
      const postId = ref.key;
      database.ref(`users/${uid}/posts`).update({[postId] : isReadable}).then(()=>{
        if(isReadable){
          database.ref(`isPublic`).push({id: postId})
        };
      });
      dispatch(addPost({
        id: ref.key,
        ...post
      }));
    });
  };
};

// REMOVE_POST
export const removePost = ({ id } = {}) => ({
  type: 'REMOVE_POST',
  id
});

export const startRemovePost = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`posts/${id}`).remove().then(() => {
      //REMOVE FROM PUBLIC LIST IF WAS THERE BEFORE
      database.ref(`isPublic`).orderByChild("id").equalTo(id).once("value",snapshot => {
          const wasPublic = snapshot.val();
          if (!!wasPublic){
            const publicPostId = Object.keys(wasPublic)[0];
            database.ref(`isPublic/${publicPostId}`).remove().then(() => {
              //REMOVE FROM USER List
              database.ref(`users/${uid}/posts/${id}`).remove().then(()=>console.log("success remove from user"))
              .catch(error => console.log(error));
            }).catch(error => console.log(error));
          } else {
            //REMOVE FROM USER List
            database.ref(`users/${uid}/posts/${id}`).remove().then(()=>console.log("success remove from user"))
            .catch(error => console.log(error));
          }
      });
      dispatch(removePost({ id }));
    });
  };
};

// EDIT_POST
export const editPost = (id, updates) => ({
  type: 'EDIT_POST',
  id,
  updates
});

export const startEditPost = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`posts/${id}`).update(updates).then(() => {
      //ADD TO PUBLIC LIST IF WAS NOT THERE ALREADY
      if(updates.isReadable){
        database.ref(`isPublic`).orderByChild("id").equalTo(id).once("value",snapshot => {
            const wasPublic = snapshot.val();
            if (!wasPublic){
              database.ref(`isPublic`).push({id: id})
            }
        });
        //REMOVE FROM PUBLIC LIST IF WAS THERE BEFORE
      } else {
        database.ref(`isPublic`).orderByChild("id").equalTo(id).once("value",snapshot => {
            const wasPublic = snapshot.val();
            const publicPostId = Object.keys(wasPublic)[0];
            if (!!wasPublic){
              database.ref(`isPublic/${publicPostId}`).remove();
            }
        });
      }
      database.ref(`users/${uid}/posts`).update({[id]: updates.isReadable});
      dispatch(editPost(id, updates));
    });
  };
};

// SET_POSTS
export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts
});

export const startSetPosts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/posts`).once('value').then((snapshot) => {
      if(!snapshot.val()) {
        let posts = [];
        dispatch(setPosts(posts));
      } else {
        return new Promise((resolve, reject) => {
          const postIds = [];
          snapshot.forEach((childSnapshot) => {
            postIds.push(childSnapshot.key);
          });
          let posts = [];
          postIds.forEach((postId, index)=>{
            database.ref(`posts/${postId}`).once('value').then((postSnapshot) => {
              posts.push({
                id: postSnapshot.key,
                ...postSnapshot.val()
              });
              if (index === postIds.length-1) {
                resolve(posts);
              }
            }).catch((error) => {
              console.log("error", error);
              reject(error);
            });
          });
        }).then((posts)=>{
          dispatch(setPosts(posts));
        }).catch(error => {
          console.log(error)
        });
      }
    }).catch((error)=>{
      console.log('error', error);
    });
  };
};
