import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    // axios.get('ingredients.json').then(res => {
    //   this.setState({ingredients: res.data})
    // }).catch(err => {
    //   this.setState({error: true});
    // });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((currSum, el) => {
        return currSum + el;
      }, 0);

      return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseCheckoutHandler = () => {

    this.props.history.push('/checkout');
  }

  render() {
    const disableInfo = {
      ...this.props.ings
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    let burger = <Spinner />;

    if (this.state.error) {
      burger = <p>Ingredients can`t be loaded.</p>
    }

    if (this.props.ings) {
      orderSummary = <OrderSummary 
      price={this.props.price}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseCheckout={this.purchaseCheckoutHandler}
      ingredients={this.props.ings}/>;

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BurgerControls 
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disableInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: (ingredientName) => 
      dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    onIngredientRemove: (ingredientName) => 
      dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));