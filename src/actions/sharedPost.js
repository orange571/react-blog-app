//import database from '../firebase/firebase';


// VIEW_POST
export const viewPost = (post) => ({
  type: 'VIEW_POST',
  post
});

export const startViewPost = function(id) {
  return (dispatch, getState) => {
    console.log(id);
    return database.ref(`posts/${id}`).once('value').then((snapshot) => {
      let post = snapshot.val();
      console.log(snapshot.val());
      if(!post) {
        post = {error: "Unable to find post"};
      }
      dispatch(viewPost(post));
      ;
    });
  };
}
