'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('verification_requests', {
        // for next-auth https://next-auth.js.org/adapters/typeorm/postgres
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        identifier: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        expires: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      })
      .then(() =>
        queryInterface.addIndex('verification_requests', ['token'], {
          unique: true,
        })
      );
  },

  down: async (queryInterface) => {
    return queryInterface
      .dropTable('verification_requests')
      .then(() =>
        queryInterface.removeIndex('verification_requests', ['token'])
      );
  },
};
