import React, { useState } from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { updateObject, checkValidity } from '../../../shared/utility'

const contactData = props => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [orderForm, setOrderForm] = useState({
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street address'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country '
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fast', label: 'Fastest'},
            { value: 'cheap', label: 'Cheapest'},
          ]
        },
        value: 'fast',
        validation: {},
        valid: true,
      },
  });

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElID in orderForm) {
      formData[formElID] = orderForm[formElID].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userID: props.userID,
    }
    props.onOrderBurger(order, props.token);
  }

  const inputChangedHandler = (event, inputID) => {
    const updatedFormElement = updateObject(orderForm[inputID], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputID].validation),
      touched: true,
    });

    const updatedOrderform =updateObject(orderForm, {
      [inputID]: updatedFormElement,
    });

    let validForm = true;
    for (let input in updatedOrderform) {
      validForm = updatedOrderform[input].valid && validForm
    }

    setOrderForm(updatedOrderform);
    setIsFormValid(validForm);
  }

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(el => (
        <Input 
          key={el.id}
          elementType={el.config.elementType} 
          elementConfig={el.config.elementConfig} 
          value={el.config.value}
          invalid={!el.config.valid}
          shouldValidate={el.config.validation}
          touched={el.config.touched}
          changed={(event) => inputChangedHandler(event, el.id)}/>
      ))}
      <Button btnType="Success" disabled={!isFormValid}>Order</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner/>
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact info.</h4>
      {form}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));