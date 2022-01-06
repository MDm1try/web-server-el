import { Medias, Posts, Users } from '../../../../../../models';

export default async function (req, res) {
  try {
    const { postId } = req.params;

    const post = await Posts.findByPk(postId, {
      include: [{ model: Medias, as: 'medias' }],
      attributes: [
        'id',
        'userId',
        'name',
        'cadNum',
        'type',
        'status',
        'areaHectares',
        'purpose',
        'cost',
        'costPer',
        'currency',
        'description',
        'shape',
        'publishedAt',
        'createdAt',
      ],
    });

    const user = await Users.findByPk(post.userId, {
      attributes: ['id', 'name', 'phone'],
    });

    if (!post) {
      const error = { error: 'The post is not exists.' };
      return res.status(400).json(error);
    }
    return res.status(200).send({ post, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
