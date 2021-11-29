import { Posts, Medias, sequelize } from '../../../../../models';

export default async function (req, res) {
  const transaction = await sequelize.transaction();

  try {
    const {
      name,
      cadNum,
      area,
      type,
      purpose,
      cost,
      currency,
      description,
      shape,
      medias,
    } = req.body;

    const post = await Posts.create(
      {
        userId: req.user.id,
        name,
        cadNum,
        areaHectares: area,
        type,
        purpose,
        cost,
        currency,
        description,
        shape,
        medias,
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
