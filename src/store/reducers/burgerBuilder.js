import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  priceList: {},
  ingredients: null,
  totalPrice: 4.0,
  error: false,
  building: false,
}

const addIngredient = (state, action) => {
  const ingredientName = action.ingredientName;
  const ingredient = { [ingredientName]: state.ingredients[ingredientName] + 1 };
  const updated = updateObject(state.ingredients, ingredient);
  const updatedState = {
    ingredients: updated,
    totalPrice: state.totalPrice + state.priceList[ingredientName],
    building: true,
  }
  return updateObject(state, updatedState);
} 

const removeIngredient = (state, action) => {
  const ingredientName = action.ingredientName;
  const ing = { [ingredientName]: state.ingredients[ingredientName] - 1 };
  const upd = updateObject(state.ingredients, ing);
  const updatedSt = {
    ingredients: upd,
    totalPrice: state.totalPrice - state.priceList[ingredientName],
    building: true,
  }
  return updateObject(state, updatedSt);
}
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4.0,
    building: true,
  });
}

const fetchIngredientsFailes = (state) => {
  return updateObject(state, {
    ingredients: null,
    error: true,
  });
}

const setPriceList = (state, action) => {
  return updateObject(state, {
    priceList: action.priceList
  });
}

const reducer = (state = initialState, action) => { 
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailes(state);
    case actionTypes.SET_PRICE_LIST: return setPriceList(state, action);
    default: return state;
  }
}

export default reducer;