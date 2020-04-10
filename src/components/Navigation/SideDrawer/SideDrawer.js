import React from 'react';
import PropTypes from 'prop-types'

import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer];
  if (props.opened) {
    attachedClasses.push(classes.Open)
  } else {
    attachedClasses.push(classes.Close)
  }

  return(
    <Aux>
      <Backdrop show={props.opened} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

sideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool,
}

export default sideDrawer;