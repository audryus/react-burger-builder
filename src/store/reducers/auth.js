import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
}

const authStart = (state) => {
  return updateObject(state, {error: null, loading: true});  
}
const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false, 
    error: null, 
    token: action.token, 
    userID: action.userID
  });
}
const authFailed = (state, action) => {
  return updateObject(state, {loading: false, error: action.error});
}
const authLogout = (state) => {
  return updateObject(state, {token: null, userID: null})
}
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {authRedirectPath: action.path})
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}
export default reducer;