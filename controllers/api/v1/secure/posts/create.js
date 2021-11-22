import { Post, Media, sequelize } from '../../../../../models';

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

    const post = await Post.create(
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
        Media: medias,
      },
      {
        include: [Media],
        transaction,
      }
    );

    await transaction.commit();

    return res.status(200).send(post);
  } catch (err) {
    console.error(err);

    await transaction.commit();

    return res.status(500).send();
  }
}
