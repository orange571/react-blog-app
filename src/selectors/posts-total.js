export default (posts) => {
  return posts
      .map((post) => post.amount)
      .reduce((sum, value) => sum + value, 0);
};
