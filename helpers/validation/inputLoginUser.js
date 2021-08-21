const validator = require('validator');

function inputLoginUser(data) {
  let error = '';

  if (!validator.isEmail(data.email)) {
    error = 'email is required';
  } else if (!data.password) {
    error = 'password is required';
  }

  return {
    isValid: error.length === 0,
    error,
  };
}

export default inputLoginUser;
