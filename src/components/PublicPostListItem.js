import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const PublicPostListItem = ({ id, title, body, createdAt }) => (
  <Link className="list-item list-item--public" to={`/view/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
      <div className="list-item__body">{body}</div>
    </div>  
  </Link>
);

export default PublicPostListItem;
