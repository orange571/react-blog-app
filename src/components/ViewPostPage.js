import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startViewPost, setAsLoading } from '../actions/sharedPost';
import LoadingPage from './LoadingPage';

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
                Body: {
                  this.props.post.body
                }
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  startViewPost: (uid,id) => dispatch(startViewPost(uid, id)),
  setAsLoading: () => dispatch({
    type: 'IS_LOADING'
  })
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage);
