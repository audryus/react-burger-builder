import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== props.show
  //     || nextProps.children !== props.children;
  // }
  return(
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div 
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
        >
        {props.children}
      </div>
    </Aux>
  );
}

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
}

export default React.memo(modal, (prevProps, nextProps) => {
  return nextProps.show === prevProps.show
      && nextProps.children === prevProps.children
});