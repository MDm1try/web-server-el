'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('sessions', {
        // for next-auth https://next-auth.js.org/adapters/typeorm/postgres
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
        expires: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        session_token: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        access_token: {
          allowNull: false,
          type: Sequelize.STRING,
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
        queryInterface.addIndex('sessions', ['session_token', 'access_token'], {
          unique: true,
        })
      );
  },

  down: async (queryInterface) => {
    return queryInterface
      .dropTable('sessions')
      .then(() =>
        queryInterface.removeIndex('accounts', [
          'session_token',
          'access_token',
        ])
      );
  },
};
