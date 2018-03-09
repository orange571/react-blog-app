import React from 'react';
import moment from 'moment';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      author: props.post ? props.post.author: props.displayName,
      uid: props.post ? props.post.uid : props.uid,
      isReadable : props.post ? props.post.isReadable : false,
      error: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    // Needed if there is page refresh to populate fields
    if (nextProps.post.title !== this.state.title) {
      this.setState({
        title: nextProps.post ? nextProps.post.title : '',
        body: nextProps.post? nextProps.post.body : '',
        createdAt: nextProps.post ? moment(nextProps.post.createdAt) : moment(),
        author: nextProps.post ? nextProps.post.author: nextProps.displayName,
        uid: nextProps.post ? nextProps.post.uid : nextProps.uid,
        isReadable : nextProps.post ? nextProps.post.isReadable : false,
        error: ''
      });
    }
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
  };
  toggleIsReadable = (e) => {
    this.setState({
      isReadable: e.target.checked,
    });
    this.props.displayLink(e.target.checked);
  }
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title || !this.state.body) {
      this.setState(() => ({ error: 'Please provide a title and post body.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        createdAt: this.state.createdAt.valueOf(),
        body: this.state.body,
        author: this.state.author,
        uid: this.state.uid,
        isReadable : this.state.isReadable
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Title"
          autoFocus
          className="text-input"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <textarea
          placeholder="Add a body for your post"
          className="textarea"
          value={this.state.body}
          onChange={this.onBodyChange}
        >
        </textarea>
        <div>
          <input type="checkbox" id="toggle-public-input" name="isReadable" checked={this.state.isReadable} onChange={this.toggleIsReadable}/>
          <label htmlFor="toggle-public-input">Make Public?</label>
        </div>
        <div className="form__button-container">
          <button type="submit" className="button">Save Post</button>
          {this.props.onRemove && (<button className="button button--secondary" onClick={this.props.onRemove}>Remove Post</button>)}
        </div>
      </form>
    )
  }
}
