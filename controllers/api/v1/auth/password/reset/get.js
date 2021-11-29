import { Sequelize, Users, VerificationTokens } from '../../../../../../models';

const Op = Sequelize.Op;

export default async function (req, res) {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ error: 'Token is not valid' });
    const savedToken = await VerificationTokens.findOne({
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

    const user = await Users.findByPk(savedToken.userId);

    if (!user) {
      return res.status(400).json({ error: 'Token is not valid' });
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Token is not valid' });
  }
}
