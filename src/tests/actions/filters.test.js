import moment from 'moment';
import {
  setTextFilter,
  sortByAmount,
  sortByDate
} from '../../actions/filters';


test('should generate set text filter object with text value', () => {
  const text = 'Something in';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('should generate set text filter object with default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('should generate action object for sort by date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});
