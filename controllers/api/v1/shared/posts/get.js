import { Medias, Posts, Sequelize } from '../../../../../models';
import { POST_SORTING } from '../../../../../constants';

const Op = Sequelize.Op;

export default async function (req, res) {
  try {
    const userId = req.user.id;
    const {
      page = 1, //page
      limit = 20, //limit - count posts
      search = '', //search - search string
      sortBy = 'cost', //sortBy - sort field
      sortOrder = 'desc', //sortOrder - sort direction (asc, desc)
    } = req.query;
    const sort =
      POST_SORTING[sortBy] && POST_SORTING[sortBy][sortOrder]
        ? POST_SORTING[sortBy][sortOrder]
        : [];

    const postsWhere =
      search !== ''
        ? {
            userId,
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: '%' + search + '%',
                },
              },
              {
                description: {
                  [Op.iLike]: '%' + search + '%',
                },
              },
            ],
          }
        : {
            userId,
          };
    const posts = await Posts.findAll({
      where: postsWhere,
      include: [{ model: Medias, as: 'medias' }],
      attributes: [
        'name',
        'cadNum',
        'type',
        'areaHectares',
        'purpose',
        'cost',
        'currency',
        'description',
        'shape',
        'updatedAt',
      ],
      offset: (page - 1) * limit,
      limit: limit,
      order: sort,
      subQuery: false,
    });

    return res.status(200).send(posts || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
