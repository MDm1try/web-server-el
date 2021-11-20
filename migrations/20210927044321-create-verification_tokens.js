'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('verification_tokens', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        used: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
        queryInterface.addIndex('verification_tokens', ['token'], {
          unique: true,
        })
      );
  },

  down: async (queryInterface) => {
    return queryInterface
      .dropTable('verification_tokens')
      .then(() => queryInterface.removeIndex('verification_tokens', ['token']));
  },
};
