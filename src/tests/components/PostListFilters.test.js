import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { PostListFilters } from '../../components/PostListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  wrapper = shallow(
    <PostListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
    />
  );
});

test('should render PostListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render PostListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});
