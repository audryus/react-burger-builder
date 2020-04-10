import {put} from 'redux-saga/effects';

import axios from '../axios-orders';

import * as actions from '../store/actions/order'

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post('orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  }catch(err) {
    yield put(actions.purchaseBurgerFailed(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const queryParms = '?auth=' + action.token  + '&orderBy="userID"&equalTo="' + action.userID + '"';
    const res = yield axios.get('orders.json' + queryParms);
    const fetchedOrders = yield [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  }catch(err) {
    yield put(actions.fetchOrdersFailed(err));
  }
}