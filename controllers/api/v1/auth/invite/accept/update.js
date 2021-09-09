import { User } from '../../../../../../models';
import { verifyOwnAccessToken } from '../../../../../../helpers/token';

export default async function (req, res) {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is not valid' });

    const data = verifyOwnAccessToken(token);

    if (!(data && data.payload && data.payload.id)) {
      return res.status(400).json({ error: 'Token is not valid' });
    }

    const user = await User.findByPk(data.payload.id, {
      attributes: ['id', 'emailVerified'],
    });

    if (!user) {
      return res.status(400).json({ error: 'Token is not valid' });
    }

    if (user.emailVerified) {
      return res
        .status(400)
        .json({ error: 'The Account has already been confirmed' });
    }

    await user.update({ emailVerified: new Date() });

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Token is not valid' });
  }
}
