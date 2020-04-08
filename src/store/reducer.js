import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const initialState = {
  ingredients: {
    salad: 0,
    meat:0,
    cheese:0,
    bacon: 0,
  },
  totalPrice: 4.0,
}

const reducer = (state = initialState, action) => { 
  const mutableState = {
    ...state,
    ingredients: {
      ...state.ingredients
    }
  }
  const ingredientName = action.ingredientName;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      mutableState.ingredients[ingredientName] = state.ingredients[ingredientName] + 1;
      mutableState.totalPrice = state.totalPrice + INGREDIENT_PRICES[ingredientName];
      break
    case actionTypes.REMOVE_INGREDIENT:
      mutableState.ingredients[ingredientName] = state.ingredients[ingredientName] - 1;
      mutableState.totalPrice = state.totalPrice - INGREDIENT_PRICES[ingredientName];
      break;
    default:
      return state;
  }

  return mutableState;
}

export default reducer;