import uuid from 'uuid';
import database from '../firebase/firebase';

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
      database.ref(`users/${uid}/posts`).update({[postId] : isReadable});
      if(isReadable){
        database.ref(`isPublic`).push({id: postId})
      };
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
        console.log("found id, will try code to remove")
          const wasPublic = snapshot.val();
          const publicPostId = Object.keys(wasPublic)[0];
          console.log(publicPostId);
          console.log(snapshot.val());
          if (!!wasPublic){
            database.ref(`isPublic/${publicPostId}`).remove();
            console.log("tried code to remove")
          }
      });
      //REMOVE FROM USER List
      database.ref(`users/${uid}/posts/${id}`).remove();
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
          console.log("found id, will try code to remove")
            const wasPublic = snapshot.val();
            const publicPostId = Object.keys(wasPublic)[0];
            console.log(publicPostId);
            console.log(snapshot.val());
            if (!!wasPublic){
              database.ref(`isPublic/${publicPostId}`).remove();
              console.log("tried code to remove")
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
      const postIds = snapshot.val() ? Object.getOwnPropertyNames(snapshot.val()) : [];
      console.log(postIds);
      console.log(snapshot.val());
      let posts = [];
      if(postIds.length > 0) {
        postIds.forEach((postId, index)=>{
          console.log(postId, index);
          database.ref(`posts/${postId}`).once('value').then((postSnapshot) => {
            posts.push({
              id: postSnapshot.key,
              ...postSnapshot.val()
            });
            console.log(index);
            console.log(postIds.length-1);
            if (index === postIds.length-1) {

              dispatch(setPosts(posts));
            }
          });
        });
      }
    });
  };
};
