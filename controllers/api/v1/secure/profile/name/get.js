import { Users } from '../../../../../../models';

export default async function (req, res) {
  try {
    let user = await Users.findByPk(req.user.id, {
      attributes: ['firstName', 'lastName'],
    });

    if (!user) {
      let error = { error: 'The user is not exists.' };
      return res.status(400).json(error);
    }

    return res
      .status(200)
      .send({ firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
