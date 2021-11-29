import bcrypt from 'bcrypt';

import { inputRegisterUser } from '../../../../../helpers/validation';
import { Users, Accounts, sequelize } from '../../../../../models';
import { USER_ROLE_MAP } from '../../../../../constants';
import { generateAccessToken } from '../../../../../helpers/token';
import { sendInvitation } from '../../../../../mail/methods';

export default async function (req, res) {
  const { isValid, errors } = await inputRegisterUser(req.body);

  if (!isValid) return res.status(400).json(errors);

  const transaction = await sequelize.transaction();

  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);

    let user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      user = await Users.create(
        {
          email,
          password: cryptPassword,
          role: USER_ROLE_MAP.SUBSCRIBER,
          Accounts: [
            {
              providerType: 'credentials',
              compoundId: email,
              providerId: 'own',
              providerAccountId: 'own',
            },
          ],
        },
        {
          include: [Accounts],
          transaction,
        }
      );
    } else {
      await user.update({ password: cryptPassword }, { transaction });
      await Accounts.create(
        {
          userId: user.id,
          providerType: 'credentials',
          compoundId: email,
          providerId: 'own',
          providerAccountId: 'own',
        },
        { transaction }
      );
    }

    await transaction.commit();

    const payload = { id: user.id };
    const token = generateAccessToken({ payload }, '7d');
    const invitationUrl = `${process.env.CLIENT_URL}/confirmation/${token}`;
    sendInvitation(email, invitationUrl);

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);

    await transaction.rollback();

    return res.status(500).send();
  }
}
