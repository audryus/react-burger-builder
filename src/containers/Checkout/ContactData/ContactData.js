import React, { Component } from 'react';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    loading: false,
    isFormValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElID in this.state.orderForm) {
      formData[formElID] = this.state.orderForm[formElID].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    }
    // Simuate a 1 sec delay
    setTimeout(() => {
      axios.post('orders.json', order)
        .then(response => {
          this.setState({ loading: false});
          this.props.history.push('/')
        }).catch(err => {
          this.setState({ loading: false});
        });
    }, 1000)
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return isValid;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >=rules.minLength && isValid;
    }
    if(rules.minLength) {
      isValid = value.length <=rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputID) => {
    const updatedOrderform = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderform[inputID]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderform[inputID] = updatedFormElement;

    let validForm = true;
    for (let input in updatedOrderform) {
      validForm = updatedOrderform[input].valid && validForm
    }

    this.setState({orderForm: updatedOrderform, isFormValid: validForm});
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(el => (
          <Input 
            key={el.id}
            elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig} 
            value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            changed={(event) => this.inputChangedHandler(event, el.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.isFormValid}>Order</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info.</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;