import bcrypt from 'bcrypt';

import { inputLoginUser } from '../../../../../helpers/validation';
import { generateAccessToken } from '../../../../../helpers/auth';
import { User } from '../../../../../models';

export default async function (req, res) {
  try {
    const { error, isValid } = inputLoginUser(req.body);
    if (!isValid) {
      return res.status(400).send({ error });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return res
        .status(400)
        .send({ error: 'The email or password is invalid' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .send({ error: 'The email or password is invalid' });
    }

    const payload = { id: user.id };
    const jwtToken = generateAccessToken(payload, '24h');

    return res.status(200).send({
      jwtToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
