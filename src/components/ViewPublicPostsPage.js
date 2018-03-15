import React from 'react';
import Header from './Header';
import LoadingPage from './LoadingPage';
import PublicPostsList from './PublicPostsList';
import database from '../firebase/firebase';

class ViewPublicPostsPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading:false,
      posts: []
    }
  }
  componentDidMount() {
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoading:true
      }
    });
    database.ref('isPublic').once('value').then((snapshot)=> {
      const publicPostIds = snapshot.val();
      const postIds = [];
      snapshot.forEach((childSnapshot)=>{
        postIds.push(childSnapshot.val().id);
      });
      const posts = [];
      if(postIds.length > 0) {
        postIds.forEach((postId, index)=>{
          database.ref(`posts/${postId}`).once('value').then((postSnapshot) => {
            posts.push({
              id: postSnapshot.key,
              ...postSnapshot.val()
            });
            if (index === postIds.length-1) {
              posts.sort((a,b)=> a.createdAt < b.createdAt ? 1 : -1);
              this.setState((prevState) => ({
                ...prevState,
                isLoading:false,
                posts
              }))
            }
          }).catch(error => {
            console.log(error);
            posts.push({
              id: postId,
              title: "error fetching post",
              body: postId
            });
            if (index === postIds.length-1) {
              posts.sort((a,b)=> a.createdAt < b.createdAt ? 1 : -1);
              this.setState((prevState) => ({
                ...prevState,
                isLoading:false,
                posts
              }))
            }
          });
        });
      } else {
        this.setState((prevState) => ({
          ...prevState,
          isLoading:false,
        }))
      }

    }).catch(error => this.setState((prevState) => ({
       ...prevState,
       error,
       isLoading: false
    })));
  }
  render() {
    const isLoading = this.state.isLoading;
    const error = this.state.error;

    if (error) {
      return <p>Something went wrong: {error} </p>
    }

    if (isLoading === true) {
      return <LoadingPage />;
    }
    return (
      <div>
        <Header />
        <PublicPostsList posts={this.state.posts}/>
      </div>
    )
  }
}
export default ViewPublicPostsPage;
