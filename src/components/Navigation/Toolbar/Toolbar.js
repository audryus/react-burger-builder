import React from 'react';
import PropTypes from 'prop-types'

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => {
  return(
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggled}/>
      <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems></NavigationItems>
      </nav>

    </header>
  );
}

toolbar.propTypes ={
  drawerToggled: PropTypes.func.isRequired,
}

export default toolbar;