import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actions from '../store/actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga, initPriceListSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actions.AUTH_INIT_LOGOUT, logoutSaga),
    takeEvery(actions.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actions.AUTH_USER, authUserSaga),
    takeEvery(actions.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurger() {
  yield all([
    takeEvery(actions.INIT_INGREDIENTS, initIngredientsSaga),
    takeEvery(actions.INIT_PRICE_LIST, initPriceListSaga),
  ]);
}

export function* watchOrder() {
  yield all([
    takeLatest(actions.PURCHASE_BURGER_INIT, purchaseBurgerSaga),
    takeLatest(actions.FETCH_ORDERS_INIT, fetchOrdersSaga),
  ]);
}