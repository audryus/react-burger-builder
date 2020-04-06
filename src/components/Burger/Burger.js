import React from 'react';
import PropType from 'prop-types';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(k => {
      return [...Array(props.ingredients[k])].map((_, i) => {
        return <BurgerIngredient key={k + i} type={k} />;
      });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please starting adding ingredients.</p>;
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

burger.propTypes = {
  ingredients: PropType.object.isRequired
}

export default burger;