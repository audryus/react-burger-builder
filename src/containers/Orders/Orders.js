import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as action from '../../store/actions/'

class Orders extends Component {
  state ={
    loading: true,
  }
  componentDidMount() {
    this.props.onOrderInit(this.props.token, this.props.userID);
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={order.price}/>
      ));
    } 

    return (
      <div>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderInit: (token, userID) => dispatch(action.fetchOrders(token, userID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));