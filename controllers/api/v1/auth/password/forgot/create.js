import crypto from 'crypto';
import { VerificationToken, User } from '../../../../../../models';
import sendResetPasswordUrl from '../../../../../../mail/methods/sendResetPasswordUrl';
import { isEmail } from '../../../../../../helpers/validators';

export default async function (req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    } else if (!isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const user = await User.findOne({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(64).toString('hex');
      let expiresDate = new Date();
      expiresDate.setHours(expiresDate.getHours() + 1);
      await VerificationToken.create({
        token,
        userId: user.id,
        type: 'email',
        used: false,
        expires: expiresDate.toISOString(),
      });
      const invitationUrl = `${process.env.CLIENT_URL}/reset_password/${token}`;
      sendResetPasswordUrl(email, invitationUrl);
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
}
