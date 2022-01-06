import { inputCreatePost } from '../../../../../helpers/validation';
import { Posts, Medias, sequelize } from '../../../../../models';

export default async function (req, res) {
  const transaction = await sequelize.transaction();

  try {
    const { errors, isValid } = inputCreatePost(req.body);

    if (!isValid) {
      return res.status(400).send({ errors });
    }

    const {
      name,
      cadNum,
      areaHectares,
      type,
      purpose,
      cost,
      currency,
      description,
      shape,
      medias,
      costPer,
    } = req.body;

    const post = await Posts.create(
      {
        userId: req.user.id,
        name,
        cadNum,
        areaHectares,
        type,
        purpose,
        cost,
        currency,
        description,
        shape,
        medias,
        costPer,
      },
      {
        include: [{ model: Medias, as: 'medias' }],
        transaction,
      }
    );

    await transaction.commit();

    return res.status(200).send(post);
  } catch (err) {
    console.error(err);

    await transaction.rollback();

    return res.status(500).send();
  }
}
