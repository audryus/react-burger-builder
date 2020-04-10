import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {type: actionTypes.ADD_INGREDIENT, ingredientName: name};
}

export const removeIngredient = (name) => {
  return {type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}
}

export const setIngredients = (ingredients) => {
  return {type: actionTypes.SET_INGREDIENTS, ingredients: ingredients};
}

export const fetchIngredientsFailed = () => {
  return {type: actionTypes.FETCH_INGREDIENTS_FAILED};
}
export const initIngredients = () => {
  return { type: actionTypes.INIT_INGREDIENTS }
}

export const setPriceList = (priceList) => {
  return {type: actionTypes.SET_PRICE_LIST, priceList: priceList};
}

export const fetchPriceListFailed = () => {
  return {type: actionTypes.FETCH_PRICE_LIST_FAILED}
}

export const initPriceList = () => {
  return { type: actionTypes.INIT_PRICE_LIST}
}