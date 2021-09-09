import bcrypt from 'bcrypt';

import { inputRegisterUser } from '../../../../../helpers/validation';
import { User, Account } from '../../../../../models';
import { USER_ROLE_MAP } from '../../../../../constants';
import { generateAccessToken } from '../../../../../helpers/token';
import { sendInvitation } from '../../../../../mail/methods';

export default async function (req, res) {
  const { isValid, errors } = await inputRegisterUser(req.body);

  if (!isValid) return res.status(400).json(errors);

  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);

    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      user = await User.create(
        {
          email,
          password: cryptPassword,
          role: USER_ROLE_MAP.SUBSCRIBER,
          account: {
            providerType: 'credentials',
            compoundId: 'own',
            providerId: 'own',
            providerAccountId: 'own',
          },
        },
        {
          include: [Account],
        }
      );
    } else {
      await user.update({ password: cryptPassword });
      await Account.create({
        userId: user.id,
        providerType: 'credentials',
        compoundId: 'own',
        providerId: 'own',
        providerAccountId: 'own',
      });
    }

    const payload = { id: user.id };
    const token = generateAccessToken({ payload }, '7d');
    const invitationUrl = `${process.env.CLIENT_URL}/confirmation/${token}`;
    sendInvitation(email, invitationUrl);

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
