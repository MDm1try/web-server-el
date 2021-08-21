import bcrypt from 'bcrypt';

import { inputRegisterUser } from '../../../../../helpers/validation';
import { User } from '../../../../../models';
import { USER_ROLE_MAP } from '../../../../../helpers/constants';

export default async function (req, res) {
  const { isValid, errors } = inputRegisterUser(req.body);
  if (!isValid) return res.status(400).json(errors);

  try {
    const { email, password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: cryptPassword,
      role: USER_ROLE_MAP.SUBSCRIBER,
    });

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}
