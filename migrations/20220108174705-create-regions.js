'use strict';
const regions = require('../data/regions');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction;

    try {
      transaction = await queryInterface.sequelize.transaction();

      await queryInterface.createTable(
        'regions',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        'regions',
        regions.map((region) => ({
          id: region.id,
          normalized_name: region.normalizedName,
          uk_name: region.ukName,
          ru_name: region.ruName,
        })),
        {
          transaction,
        }
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
    return queryInterface.dropTable('regions');
  },
};
