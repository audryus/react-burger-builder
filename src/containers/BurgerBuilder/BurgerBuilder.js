import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const burgerBuilder = props => {

  const ings = useSelector(state => state.burger.ingredients);
  const price = useSelector(state => state.burger.totalPrice);
  const error = useSelector(state => state.burger.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();

  const onIngredientAdd = (ingredientName) => 
      dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemove = (ingredientName) => 
      dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const onInitPriceList = useCallback(() => dispatch(actions.initPriceList()), []);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
    onInitPriceList();
  }, [onInitIngredients, onInitPriceList])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((currSum, el) => {
        return currSum + el;
      }, 0);

      return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push("/auth");
    }

  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseCheckoutHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const disableInfo = {
    ...ings
  }
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = <Spinner />;

  if (error) {
    burger = <p>Ingredients can`t be loaded.</p>
  }

  if (ings) {
    orderSummary = <OrderSummary 
    price={price}
    purchaseCanceled={purchaseCancelHandler}
    purchaseCheckout={purchaseCheckoutHandler}
    ingredients={ings}/>;

    burger = (
      <Aux>
        <Burger ingredients={ings}/>
        <BurgerControls 
          ingredientAdded={onIngredientAdd}
          ingredientRemoved={onIngredientRemove}
          disabled={disableInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}/>
      </Aux>
    );
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

export default withErrorHandler(burgerBuilder, axios);