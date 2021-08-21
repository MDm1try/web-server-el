export default function (data) {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'required';
  }
  if (!data.lastName) {
    errors.lastName = 'required';
  }
  if (!data.password) {
    errors.password = 'required';
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = 'required';
  }

  if (data.password !== data.confirmPassword) {
    errors.password = 'your password and confirm password is not matched';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
