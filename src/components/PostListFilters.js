import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTextFilter, sortByDate, sortByTitle} from '../actions/filters';

export class PostListFilters extends React.Component {
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'title') {
      this.props.sortByTitle();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__left">
            <div className="input-group__item">
              <input
                type="text"
                className="text-input"
                placeholder="Search posts"
                value={this.props.filters.text}
                onChange={this.onTextChange}
              />
            </div>
            <div className="input-group__item">
              <select
                className="select"
                value={this.props.filters.sortBy}
                onChange={this.onSortChange}
              >
                <option value="title">Title</option>
                <option value="date">By Date</option>
              </select>
            </div>
          </div>  
          <div className="input-group__item">
                <Link className="button" to="/create">Add Post</Link>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByTitle: () => dispatch(sortByTitle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListFilters);
