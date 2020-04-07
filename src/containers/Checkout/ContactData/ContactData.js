import React, { Component } from 'react';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Max Sch',
        address: {
          street: 'Address Street 1',
          country: 'Facebook',
          zipCode: '1234560',
        },
        email: 'max@acme.com'
      },
      deliveryMethod: 'fastest'
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

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Full Name"/>
        <input className={classes.Input} type="email" name="email" placeholder="E-mail"/>
        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
        <input className={classes.Input} type="text" name="zipCode" placeholder="Zip Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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