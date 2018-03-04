import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const PostListItem = ({ id, title, body, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
    </div>
    <h3 className="list-item__data">{moment(createdAt).format('M/D/YY')}</h3>
  </Link>
);

export default PostListItem;
