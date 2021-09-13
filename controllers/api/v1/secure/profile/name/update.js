import { inputUpdateName } from '../../../../../../helpers/validation';
import { User } from '../../../../../../models';

export default async function (req, res) {
  const { isValid, error } = await inputUpdateName(req.body);

  if (!isValid) return res.status(400).json(error);

  try {
    const { firstName, lastName } = req.body;

    let user = await User.findByPk(1);

    if (!user) {
      let error = { error: 'The user is not exists.' };
      console.error(error);
      return res.status(400).json(error);
    }
    const preparedFirstName = firstName.trim();
    const preparedLastName = lastName.trim();
    const name = preparedFirstName + ' ' + preparedLastName;

    await user.update({
      firstName: preparedFirstName,
      lastName: preparedLastName,
      name,
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
