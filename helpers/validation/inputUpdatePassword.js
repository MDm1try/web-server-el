export default async function (data) {
  const errors = {};

  if (!data.password) {
    errors.error = 'Password is required';
  }
  if (!data.confirmPassword) {
    errors.error = 'Confirm Password is required';
  }
  if (data.password !== data.confirmPassword) {
    errors.error = 'Password and Confirm Password are not matched';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
