import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Auth.css';
import * as actions from '../../store/actions/';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    isSignup: true,
    isFormValid: false,
    controls: {
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
    }
  }

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.onSetAuthRedirectPath();
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return isValid;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >=rules.minLength && isValid;
    }
    if(rules.maxLength) {
      isValid = value.length <=rules.maxLength && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputID) => {
    const updatedOrderform = {
      ...this.state.controls
    }
    const updatedFormElement = {
      ...updatedOrderform[inputID]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderform[inputID] = updatedFormElement;

    let validForm = true;
    for (let input in updatedOrderform) {
      validForm = updatedOrderform[input].valid && validForm
    }

    this.setState({controls: updatedOrderform, isFormValid: validForm});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  switchAuthMethodHandler =(event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
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
        changed={(event) => this.inputChangedHandler(event, el.id)}/>
    ));

    if (this.props.loading) {
      formInputs = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {formInputs}
          <Button btnType="Success">SUBMIT</Button>
          <Button 
            clicked={this.switchAuthMethodHandler}
            btnType="Danger">
              Switch to {this.state.isSignup ? 'Sign IN' : 'Sign UP'}</Button>
        </form>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);