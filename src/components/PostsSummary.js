/**

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import numeral from 'numeral';
//import selectPosts from '../selectors/posts';

export const PostsSummary = (/**{postCount, postsTotal }**/) => {
  //const postWord = postCount === 1 ? 'post' : 'posts';
  //const formattedPostsTotal = numeral(postsTotal / 100).format('$0,0.00');
/**
  return (
    <div className="page-header">
      <div className="content-container">
        //<h1 className="page-header__title">Viewing <span>{postCount}</span> {postWord} totalling <span>{formattedPostsTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Post</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  //const visiblePosts = selectPosts(state.posts, state.filters);

  return {
    postCount: visiblePosts.length,
    postsTotal: selectPostsTotal(visiblePosts)
  };
};

export default connect(mapStateToProps)(PostsSummary);
**/