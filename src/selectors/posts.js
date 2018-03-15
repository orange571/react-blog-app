import moment from 'moment';

// Get visible posts

export default (posts, { text, sortBy }) => {
  return posts.filter((post) => {
    const createdAtMoment = moment(post.createdAt);
    const textMatch = post.title.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
  });
};
