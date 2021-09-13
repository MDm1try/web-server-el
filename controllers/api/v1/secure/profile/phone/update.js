import { inputUpdatePhone } from '../../../../../../helpers/validation';
import { User } from '../../../../../../models';

export default async function (req, res) {
  const { isValid, error } = await inputUpdatePhone(req.body);

  if (!isValid) return res.status(400).json(error);

  try {
    const { phone } = req.body;

    let user = await User.findByPk(1);

    if (!user) {
      let error = { error: 'The user is not exists.' };
      console.error(error);
      return res.status(400).json(error);
    }

    await user.update({ phone: phone });
    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
