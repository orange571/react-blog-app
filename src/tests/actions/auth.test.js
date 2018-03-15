import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
  const uid = 'abc123';
  const displayName = 'name123'
  const action = login(uid, displayName);
  expect(action).toEqual({
    type: 'LOGIN',
    uid,
    displayName
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
