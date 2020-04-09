import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
    let summary = <Redirect to="/"/>
    if (this.props.ings) {
      const purchsedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary = (
        <div>
          {purchsedRedirect}
          <CheckoutSummary 
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
            ingredients={this.props.ings}></CheckoutSummary>
          <Route path={this.props.match.path + '/contact-data'} 
            component={ContactData}/>
        </div>
      )
    }
    return summary;
  }
}

const mapStatoToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased,
  };
}
export default connect(mapStatoToProps)(Checkout);