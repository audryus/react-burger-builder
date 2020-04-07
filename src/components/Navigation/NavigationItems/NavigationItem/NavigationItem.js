import React from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import classes from './NavigationItem.css';

const navigationItem = props => {
  return(
    <li className={classes.NavigationItem}>
      <NavLink
        exact={props.exact}
        to={props.link}
        activeClassName={classes.active}> 
        {props.children}
      </NavLink>
    </li>
  );
}
navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
  exact: PropTypes.bool
}


export default navigationItem;