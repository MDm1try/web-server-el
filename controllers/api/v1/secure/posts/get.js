import { Medias, Posts } from '../../../../../models';

export default async function (req, res) {
  try {
    const userId = req.user.id;

    const posts = await Posts.findAll({
      where: { userId },
      include: [{ model: Medias, as: 'medias' }],
      attributes: [
        'userId',
        'name',
        'cadNum',
        'type',
        'areaHectares',
        'purpose',
        'cost',
        'currency',
        'description',
        'shape',
      ],
    });

    return res.status(200).send(posts || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
