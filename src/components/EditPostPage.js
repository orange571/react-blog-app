import React from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { startEditPost, startRemovePost } from '../actions/posts';

export class EditPostPage extends React.Component {
  onSubmit = (post) => {
    this.props.startEditPost(this.props.post.id, post);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemovePost({ id: this.props.post.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Post</h1>
            <div>Use the link below to share with others</div>
            <a href={"/view/"+ this.props.uid +"/"+ this.props.match.params.id}>/view/{this.props.uid}/{this.props.match.params.id}</a>
          </div>
        </div>
        <div className="content-container">
          <PostForm
            post={this.props.post}
            onSubmit={this.onSubmit}
            onRemove={this.onRemove}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  post: state.posts.find((post) => post.id === props.match.params.id),
  uid: state.auth.uid,
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditPost: (id, post) => dispatch(startEditPost(id, post)),
  startRemovePost: (data) => dispatch(startRemovePost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
