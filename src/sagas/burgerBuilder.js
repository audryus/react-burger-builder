import {put} from 'redux-saga/effects';

import axios from '../axios-orders';

import * as actions from '../store/actions/burgerBuilder'

export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get('ingredients.json');
    yield put(actions.setIngredients(res.data))
  } catch(err) {
    yield put(actions.fetchIngredientsFailed())
  }
}

export function* initPriceListSaga(action) {
  try {
    const res = yield axios.get('priceList.json');
    yield put(actions.setPriceList(res.data))
  } catch(err) {
    yield put(actions.fetchPriceListFailed())
  }
}