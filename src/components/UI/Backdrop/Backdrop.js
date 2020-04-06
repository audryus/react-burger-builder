import React from 'react';
import PropTypes from 'prop-types'

import classes from './Backdrop.css';

const backdrop = props => {
  let back = null;
  if (props.show) {
    back = (
      <div 
        className={classes.Backdrop}
        onClick={props.clicked}>
      </div>
    );
  }
  return(
    back
  );
}

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
}

export default backdrop;