import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Auth.css';
import * as actions from '../../store/actions/';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';

const auth = props => {
  const [isSignup, setIsSignup] = useState(true);

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email address'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const {building, authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath])

  const inputChangedHandler = (event, inputID) => {
    const updatedControls = updateObject(controls, {
      [inputID]: updateObject(controls[inputID], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[inputID].validation),
        touched: true,
      })
    });
    setControls(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    );
  }

  const switchAuthMethodHandler =(event) => {
    event.preventDefault();
    setIsSignup(!isSignup);
  }

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let formInputs = formElementsArray.map(el => (
    <Input 
      key={el.id}
      elementType={el.config.elementType} 
      elementConfig={el.config.elementConfig} 
      value={el.config.value}
      invalid={!el.config.valid}
      shouldValidate={el.config.validation}
      touched={el.config.touched}
      changed={(event) => inputChangedHandler(event, el.id)}/>
  ));

  if (props.loading) {
    formInputs = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <p>{props.error.message}</p>
    )
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath}/>
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {formInputs}
        <Button btnType="Success">SUBMIT</Button>
        <Button 
          clicked={switchAuthMethodHandler}
          btnType="Danger">
            Switch to {isSignup ? 'Sign IN' : 'Sign UP'}</Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);