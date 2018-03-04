import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { startViewPost, setAsLoading } from '../actions/sharedPost';
import LoadingPage from './LoadingPage';
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

    if (isLoading === "loading" || isLoading === "not started") {
      return <LoadingPage />;
    }

    return (
      <div>
        <header className="header">
          <div className="content-container">
            <div className="header__content">
              <Link className="header__title" to="/dashboard">
                <h1>Blog</h1>
              </Link>
                {
                  this.props.displayName ? (
                    <div className="header__right-nav">
                      <div className="header__username">Signed in as {this.props.displayName}</div>
                      <button className="button button--link" onClick={this.props.startLogout}>Logout</button>
                    </div>
                  ) : (
                    <div className="header__right-nav">
                      <button className="button" onClick={this.props.startLogin}>Login</button>
                    </div>
                  )
                }
            </div>
          </div>
        </header>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Viewing Post</h1>
          </div>
        </div>
        <div className="content-container">
          <div className="view-post">
            <div>
              <h1>
                Title:  {this.props.post.title}
              </h1>
              <p>
                Body: {this.props.post.body}
              </p>
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
