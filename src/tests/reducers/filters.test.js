import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
  });
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'title'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set sortBy to title', () => {
  const currentState = {
    text: '',
    sortBy: 'date'
  };
  const action = { type: 'SORT_BY_TITLE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('title');
});

test('should set text filter', () => {
  const text = 'This is my filter';
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});
