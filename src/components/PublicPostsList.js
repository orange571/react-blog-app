import React from 'react';
import { connect } from 'react-redux';
import PublicPostListItem from './PublicPostListItem';

export const PublicPostsList = (props) => (
  <div className="content-container">
    <div className="content-container_public-posts">
      {
        props.posts.length === 0 ? (
          <div>
            <span>No posts</span>
          </div>
        ) : (
            props.posts.map((post) => {
              return <PublicPostListItem key={post.id} {...post} />;
            })
          )
      }
    </div>
  </div>
);

export default PublicPostsList;
