import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    order: {
      id: id,
      data: orderData,
    }
  }
}

const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  }
}

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('orders.json?auth=' + token, orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      }).catch(err => {
        dispatch(purchaseBurgerFailed(err));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}
const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  }
}
const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}
export const fetchOrders = (token, userID) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParms = '?auth=' + token  + '&orderBy="userID"&equalTo="' + userID + '"';
    axios.get('orders.json' + queryParms).then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch(err => {
      dispatch(fetchOrdersFailed(err));
    })
  }
}
