import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.props.ings}>
        </CheckoutSummary>
        <Route path={this.props.match.path + '/contact-data'} 
          component={ContactData}/>
      </div>
    );
  }
}

const mapStatoToProps = (state) => {
  return {
    ings: state.ingredients,
  };
}

export default connect(mapStatoToProps)(Checkout);