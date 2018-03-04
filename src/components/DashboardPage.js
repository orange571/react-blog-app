import React from 'react';
import PostList from './PostList';
import PostListFilters from './PostListFilters';
//import PostsSummary from './PostsSummary';

const DashboardPage = () => (
  <div>
    <PostListFilters />
    <PostList />    
  </div>
);

export default DashboardPage;
