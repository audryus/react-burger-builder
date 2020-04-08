import React from 'react';
import PropTypes from 'prop-types'

import classes from './Button.css';

const button = props => {
  return(
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}>
      {props.children}
    </button>
  );
}

button.propTypes = {
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  btnType: PropTypes.string.isRequired,
}

export default button;