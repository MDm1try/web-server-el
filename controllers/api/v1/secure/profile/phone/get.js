import { User } from '../../../../../../models';

export default async function (req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['phone'] });
    if (!user) {
      let error = { error: 'The user is not exists.' };
      return res.status(400).json(error);
    }
    return res.status(200).send({ phone: user.phone });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
