import { inputUpdatePhone } from '../../../../../../helpers/validation';
import { sequelize, Users } from '../../../../../../models';

export default async function (req, res) {
  const { isValid, error } = await inputUpdatePhone(req.body);
  const transaction = await sequelize.transaction();

  if (!isValid) return res.status(400).json({ error });

  try {
    const { phone } = req.body;

    const user = await Users.findByPk(req.user.id);

    if (!user) {
      let error = { error: 'The user is not exists.' };
      return res.status(400).json(error);
    }

    await user.update({ phone }, { transaction });

    await transaction.commit();

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);

    await transaction.rollback();

    return res.status(500).send();
  }
}
