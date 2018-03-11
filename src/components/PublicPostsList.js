import React from 'react';
import { connect } from 'react-redux';
import PublicPostListItem from './PublicPostListItem';

class PublicPostsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      format: "row"
    }
  }
  setGrid = (e) => {
    const format = "grid";
    this.setState(() => ({ format }));
  }
  setStacked = (e) => {
    const format = "row";
    this.setState(() => ({ format }));
  }
  render() {
    return (
      <div>
        <div className="content-container content-container--format-buttons show-for-desktop">
          <button className={`button--format ${this.state.format==='grid' && 'active'}`} onClick={this.setGrid}><i className="fas fa-th"></i></button>
          <button className={`button--format ${this.state.format==='row' && 'active'}`} onClick={this.setStacked}><i className="fas fa-th-list"></i></button>
        </div>
        <div className={`content-container content-container--public-posts ${this.state.format}`}>
            {
              this.props.posts.length === 0 ? (
                <div>
                  <span>No posts</span>
                </div>
              ) : (
                  this.props.posts.map((post) => {
                    return <PublicPostListItem key={post.id} {...post} />;
                  })
                )
          }
        </div>
      </div>
    )
  }
}

export default PublicPostsList;
