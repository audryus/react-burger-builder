import React from 'react';
import PropTypes from 'prop-types'

import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = props => {
  return(
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well.</h1>
      <div 
        style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
    </div>
  );
}

checkoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  checkoutCancel: PropTypes.func.isRequired,
  checkoutContinue: PropTypes.func.isRequired,
}

export default checkoutSummary;