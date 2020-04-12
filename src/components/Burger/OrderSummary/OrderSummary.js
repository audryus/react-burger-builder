import React  from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>
            {key}
          </span>
          : {props.ingredients[key]}
        </li>);
    })
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseCheckout}>CONTINUE</Button>
    </Aux>
  );
}

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  purchaseCheckout: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
}


export default orderSummary;