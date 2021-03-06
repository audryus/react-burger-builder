import React from 'react';
import classes from './Input.css';

const input = props => {
  let element = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch(props.elementType) {
    case('input'):
      element = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
      break;
    case('textarea'):
      element = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
      break;
    case('select'):
      element = (
        <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
          {props.elementConfig.options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
      break;
    default:
      element = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
  }
  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {element}
    </div>
  );
}

export default input;