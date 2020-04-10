export const updateObject = (oldObject, updateddValues) => {
  return {
    ...oldObject,
    ...updateddValues
  }
};

export const checkValidity = (value, rules) => {
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