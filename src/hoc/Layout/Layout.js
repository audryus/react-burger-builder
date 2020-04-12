import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.css';

import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  
  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }

  return(
    <Aux>
      <Toolbar 
        isAuth={props.isAuthenticated} 
        drawerToggled={sideDrawerToggleHandler}/>

      <SideDrawer 
        isAuth={props.isAuthenticated} 
        opened={showSideDrawer} 
        closed={sideDrawerCloseHandler} />
        
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(layout);