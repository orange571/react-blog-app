import React from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { startEditPost, startRemovePost } from '../actions/posts';

export class EditPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReadable : props.post ? props.post.isReadable : false,
    };
  }
  onSubmit = (post) => {
    this.props.startEditPost(this.props.post.id, post);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemovePost({ id: this.props.post.id });
    this.props.history.push('/');
  };
  displayLink = (isReadable) => {
    this.setState(()=>({isReadable:isReadable}));
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Post</h1>
            {this.state.isReadable ? (
                <div id="link-container">
                  <div>Use the link below to share with others</div>
                  <a href={"/view/"+ this.props.match.params.id} target="_blank">https://thought-collector-app.herokuapp.com/view/{this.props.match.params.id}</a>
                </div>
              ) : (
                <div id="link-container">
                  <div>Get a link to share your post with others</div>
                  <div>when you check "Make Public"</div>
                </div>
              )
            }
          </div>
        </div>
        <div className="content-container">
          <PostForm
            post={this.props.post}
            onSubmit={this.onSubmit}
            onRemove={this.onRemove}
            displayLink={this.displayLink}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  post: state.posts.find((post) => post.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditPost: (id, post) => dispatch(startEditPost(id, post)),
  startRemovePost: (data) => dispatch(startRemovePost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
