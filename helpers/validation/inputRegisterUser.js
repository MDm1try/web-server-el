import { Users, Accounts } from '../../models';
import { isEmail } from '../validators';

export default async function (data) {
  const errors = {};

  if (!data.email) {
    errors.error = 'Email is required';
  }

  if (data.email && !isEmail(data.email)) {
    errors.error = 'Invalid email address';
  } else if (data.email) {
    const user = await Users.findOne({
      where: { email: data.email },
      include: {
        model: Accounts,
        where: { providerType: 'credentials' },
      },
    });
    if (user) {
      errors.error = 'The email already exists';
    }
  }

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
