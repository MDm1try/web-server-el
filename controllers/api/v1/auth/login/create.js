import bcrypt from 'bcrypt';

import { inputLoginUser } from '../../../../../helpers/validation';
import { generateAccessToken } from '../../../../../helpers/token';
import { User, Account, Sequelize } from '../../../../../models';

const Op = Sequelize.Op;

export default async function (req, res) {
  try {
    const { error, isValid } = inputLoginUser(req.body);
    if (!isValid) {
      return res.status(400).send({ error });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, emailVerified: { [Op.ne]: null } },
      attributes: ['password'],
      include: {
        model: Account,
        where: { providerType: 'credentials' },
      },
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
    const accessToken = generateAccessToken(payload, '24h');

    return res.status(200).send({
      accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
