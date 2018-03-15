import moment from 'moment';
import selectPosts from '../../selectors/posts';
import posts from '../fixtures/posts';

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
  };
  const result = selectPosts(posts, filters);
  expect(result).toEqual([posts[2], posts[1]]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
  };
  const result = selectPosts(posts, filters);
  expect(result).toEqual([posts[2], posts[0], posts[1]]);
});

test('should sort by title', () => {
  const filters = {
    text: '',
    sortBy: 'title',
  };
  const result = selectPosts(posts, filters);
  expect(result).toEqual([posts[2], posts[0], posts[1]]);
});
