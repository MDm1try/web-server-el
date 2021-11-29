import bcrypt from 'bcrypt';

import {
  Sequelize,
  User,
  VerificationToken,
  Account,
  sequelize,
} from '../../../../../../models';
import { inputUpdatePassword } from '../../../../../../helpers/validation';

const Op = Sequelize.Op;

export default async function (req, res) {
  const { isValid, errors } = await inputUpdatePassword(req.body);
  const transaction = await sequelize.transaction();

  if (!isValid) return res.status(400).json(errors);

  try {
    const { token, password } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is not valid' });
    const savedToken = await VerificationToken.findOne({
      where: {
        token,
        expires: {
          [Op.gt]: new Date(),
        },
      },
    });
    if (!savedToken)
      return res.status(400).json({ error: 'Token is not valid' });
    if (savedToken.used)
      return res.status(400).json({
        error: 'The token has been used. Please reset your password again.',
      });

    const user = await User.findByPk(savedToken.userId);

    if (!user) {
      return res.status(400).json({ error: 'Token is not valid' });
    }

    const account = await Account.findOne({
      where: { userId: savedToken.userId, providerType: 'credentials' },
    });

    if (!account) {
      await Account.create(
        {
          userId: user.id,
          providerType: 'credentials',
          compoundId: user.email,
          providerId: 'own',
          providerAccountId: 'own',
        },
        { transaction }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);
    await user.update({ password: cryptPassword }, { transaction });
    await savedToken.update({ used: true }, { transaction });

    await transaction.commit();

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);

    await transaction.rollback();

    return res.status(500).send({ error: 'Token is not valid' });
  }
}
