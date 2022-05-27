'use strict';
const cities = require('../data/cities');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction;

    try {
      transaction = await queryInterface.sequelize.transaction();

      await queryInterface.createTable(
        'cities',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          region_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'regions',
              key: 'id',
            },
          },
          longitude: {
            type: Sequelize.DOUBLE,
            allowNull: false,
          },
          latitude: {
            type: Sequelize.DOUBLE,
            allowNull: false,
          },
          zoom: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          radius: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          has_districts: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          normalized_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          uk_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ru_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.bulkInsert(
        'cities',
        cities.map((city) => ({
          id: city.id,
          region_id: city.regionId,
          longitude: city.longitude,
          latitude: city.latitude,
          zoom: city.zoom,
          radius: city.radius,
          has_districts: city.hasDistricts,
          normalized_name: city.normalizedName,
          uk_name: city.ukName,
          ru_name: city.ruName,
        })),
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      throw err;
    }
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('cities');
  },
};
