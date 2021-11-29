import { inputUpdateName } from '../../../../../../helpers/validation';
import { sequelize, User } from '../../../../../../models';

export default async function (req, res) {
  const { isValid, error } = await inputUpdateName(req.body);
  const transaction = await sequelize.transaction();

  if (!isValid) return res.status(400).json(error);

  try {
    const { firstName, lastName } = req.body;

    let user = await User.findByPk(req.user.id);

    if (!user) {
      let error = { error: 'The user is not exists.' };
      return res.status(400).json(error);
    }
    const preparedFirstName = firstName.trim();
    const preparedLastName = lastName.trim();
    const name = preparedFirstName + ' ' + preparedLastName;

    await user.update(
      {
        firstName: preparedFirstName,
        lastName: preparedLastName,
        name,
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);

    await transaction.rollback();

    return res.status(500).send();
  }
}
