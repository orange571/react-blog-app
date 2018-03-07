import database from '../firebase/firebase';


// VIEW_POST
export const viewPost = (post) => ({
  type: 'VIEW_POST',
  post
});

export const startViewPost = function(uid, id) {
  return (dispatch, getState) => {
    return database.ref(`users/${uid}/posts/${id}`).once('value').then((snapshot) => {
      let post = snapshot.val();
      if(!post) {
        post = {error: "Unable to find post"};
      }
      dispatch(viewPost(post));
      ;
    });
  };
}
