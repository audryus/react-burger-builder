import { delay } from 'redux-saga';
import {put, call} from 'redux-saga/effects';

import axios from '../axios-auth';

import * as actions from '../store/actions/auth';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userID');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    }
    let url = 'accounts:signUp';
    if (!action.isSignup) {
      url = 'accounts:signInWithPassword';
    }
    try {
      const res = yield axios.post(url + '?key=' + process.env.REACT_APP_FIRE_BASE_KEY, authData);
      const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
      yield localStorage.setItem('token', res.data.idToken);
      yield localStorage.setItem('expirationDate', expirationDate);
      yield localStorage.setItem('userID', res.data.localId);
      yield put(actions.authSuccess(res.data.idToken, res.data.localId));
      yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch(err) {
      yield put(actions.authFailed(err.response.data.error));
    }
}


export function* authCheckStateSaga(action ) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userID = yield localStorage.getItem('userID');
      const timer = yield expirationDate.getTime() - new Date().getTime();
      yield put(actions.authSuccess(token, userID));
      yield put(actions.checkAuthTimeout(timer/1000));
    }
  }
}