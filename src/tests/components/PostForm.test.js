import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import PostForm from '../../components/PostForm';
import posts from '../fixtures/posts';

test('should render PostForm correctly', () => {
  const wrapper = shallow(<PostForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostForm correctly with post data', () => {
  const wrapper = shallow(<PostForm post={posts[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<PostForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set title on input change', () => {
  const value = 'New Title';
  const wrapper = shallow(<PostForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('title')).toBe(value);
});

test('should set body on textarea change', () => {
  const value = 'New body value';
  const wrapper = shallow(<PostForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('body')).toBe(value);
});


test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<PostForm post={posts[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    title: posts[0].title,
    body: posts[0].body,
    createdAt: posts[0].createdAt,
    author: posts[0].author,
    uid: posts[0].uid,
    isReadable: posts[0].isReadable
  });
});

test('should call onRemove', () => {
  const onRemoveSpy = jest.fn();
  const wrapper = shallow(<PostForm post={posts[0]} onRemove={onRemoveSpy} />);
  wrapper.find('button').at(1).simulate('click');
  expect(onRemoveSpy).toHaveBeenCalled();
});



