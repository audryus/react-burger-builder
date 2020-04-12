import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {

  const checkoutCancelHandler = () => {
    props.history.goBack();
  }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to="/"/>
  if (props.ings) {
    const purchsedRedirect = props.purchased ? <Redirect to="/"/> : null;
    summary = (
      <div>
        {purchsedRedirect}
        <CheckoutSummary 
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler}
          ingredients={props.ings}></CheckoutSummary>
        <Route path={props.match.path + '/contact-data'} 
          component={ContactData}/>
      </div>
    )
  }
  return summary;
}

const mapStatoToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased,
  };
}
export default connect(mapStatoToProps)(checkout);