import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { startViewPost, setAsLoading } from '../actions/sharedPost';
import LoadingPage from './LoadingPage';
import Header from './Header';
import { startLogin, startLogout } from '../actions/auth';

export class ViewPostPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setAsLoading();
    console.log(this.props);
    const uid =  this.props.match.params.uid;
    const id =  this.props.match.params.id;
    this.props.startViewPost(uid,id);
  }

  render() {
    const isLoading = this.props.post.isLoading;
    const error = this.props.post.error;

    if (error) {
      return <p>Something went wrong: {error} </p>
    }

    if (isLoading === "loading" || isLoading === "not started") {
      return <LoadingPage />;
    }

    return (
      <div>
        <Header />
        <div className="content-container">
          <div>
            <div className="view-post__header">
              <h1 className="view-post__title">{this.props.post.title}</h1>
              <h2 className="view-post__author">
                Submitted by {this.props.post.author}
              </h2>
            </div>
            <div className="view-post__content">
              {this.props.post.body}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.sharedPost,
    displayName: state.auth.displayName
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin()),
  startViewPost: (uid,id) => dispatch(startViewPost(uid, id)),
  setAsLoading: () => dispatch({
    type: 'IS_LOADING'
  })
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage);
