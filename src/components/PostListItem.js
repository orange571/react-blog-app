import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const PostListItem = ({ id, title, body, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <h3 className="list-item__title list-item__title--private">{title}</h3>
    <h3 className="list-item__data">{moment(createdAt).format('M/D/YY')}</h3>
  </Link>
);

export default PostListItem;
