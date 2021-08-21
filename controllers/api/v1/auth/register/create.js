import bcrypt from 'bcrypt';

import { inputRegisterUser } from '../../../../../helpers/validation';
import { User } from '../../../../../models';
import { USER_ROLE_MAP } from '../../../../../helpers/constants';
import { generateAccessToken } from '../../../../../helpers/auth';
import { sendInvitation } from '../../../../../mail/methods';

export default async function (req, res) {
  const { isValid, errors } = inputRegisterUser(req.body);

  if (!isValid) return res.status(400).json(errors);

  try {
    const { email, password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: cryptPassword,
      role: USER_ROLE_MAP.SUBSCRIBER,
    });

    const payload = { id: user.id };
    const token = generateAccessToken({ payload }, '7d');
    const invitationUrl = `${process.env.API_URL}/api/v1/auth/invite/${token}`;
    sendInvitation(email, firstName, invitationUrl);

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
