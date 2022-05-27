import { Regions, Cities, Sequelize } from '../../../../../../models';

const Op = Sequelize.Op;

export default async function (req, res) {
  const {
    limit = 5, //limit - count cities
    search = '', //search - search string
  } = req.query;

  try {
    const cities = await Cities.findAll({
      where: {
        [Op.or]: [
          {
            ukName: {
              [Op.iLike]: search + '%',
            },
          },
          {
            ruName: {
              [Op.iLike]: search + '%',
            },
          },
          {
            normalizedName: {
              [Op.iLike]: search + '%',
            },
          },
        ],
      },
      include: [{ model: Regions, as: 'region' }],
      limit,
      subQuery: false,
    });

    const results = cities.map((city) => {
      const pattern = new RegExp(`^${search}`, 'i');

      const ukResult = city.ukName.match(pattern) || 0;
      const ruResult = city.ruName.match(pattern) || 0;

      const result = {
        id: city.id,
        regionId: city.region.id,
        latitude: city.latitude,
        longitude: city.longitude,
        normalizedName: city.normalizedName,
        zoom: city.zoom,
      };
      if (ukResult >= ruResult) {
        return {
          ...result,
          name: city.ukName,
          regionName: city.region.ukName,
          coutry: 'Україна',
        };
      } else {
        return {
          ...result,
          name: city.ruName,
          regionName: city.region.ruName,
          coutry: 'Украина',
        };
      }
    });

    return res.status(200).send(results || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json();
  }
}
