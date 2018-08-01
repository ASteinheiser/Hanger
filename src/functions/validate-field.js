import validator from 'validator';

export const validateField = function(field, value, state) {
  let valid;

  switch (field) {
    case 'email':
      valid = validator.isEmail(value)
      break;
    case 'password':
      valid = validator.matches(value, /(?=^.{12,255}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=(.*\d){1,}))((?!.*[",;&|'])|(?=(.*\W){1,}))(?!.*[",;&|'])^.*$/)
      break;
    case 'passwordMatch':
      valid = (value === state.password.value)
      break;
    default:
      valid = value.length > 1;
      break;
  }

  return {
    value: value,
    valid: valid
  }
};
