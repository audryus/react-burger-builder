import reducer from './auth';
import * as actions from '../actions/actionTypes';

const initilState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
}

describe('auth reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initilState)
  });

  it('should store the token upon login', () => {
    expect(reducer(initilState, {
      type: actions.AUTH_SUCCESS,
      token: 'some-token',
      userID: 'some-user-id',
    })).toEqual({
      ...initilState,
      token: 'some-token',
      userID: 'some-user-id',
    })
  });
  
});