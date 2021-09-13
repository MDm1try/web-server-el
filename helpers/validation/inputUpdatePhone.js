import { isMobilePhone } from 'validator';

function inputUpdatePhone(data) {
  let error = '';

  if (!data.phone) {
    error = 'Phone is required';
  } else if (!isMobilePhone(data.phone, 'uk-UA')) {
    error = 'Phone is invalid';
  }

  return {
    isValid: error.length === 0,
    error,
  };
}

export default inputUpdatePhone;
