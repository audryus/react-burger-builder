import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/original.png'

const logo = props => {
  return(
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger Builder"/>
    </div>
  );
}

export default logo;