import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

const authSuccess = (token, userID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID
  }
}

const authFailed = (err) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: err,
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userID');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url = process.env.REACT_APP_FIRE_BASE_AUTH + 'signUp?key=' + process.env.REACT_APP_FIRE_BASE_KEY;
    if (!isSignup) {
      url = process.env.REACT_APP_FIRE_BASE_AUTH + 'signInWithPassword?key=' + process.env.REACT_APP_FIRE_BASE_KEY
    }
    axios.post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userID', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      }).catch(err => {
        dispatch(authFailed(err.response.data.error));
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userID = localStorage.getItem('userID');
        const timer = expirationDate.getTime() - new Date().getTime();
        dispatch(authSuccess(token, userID));
        dispatch(checkAuthTimeout(timer/1000));
      }
    }
  }
}