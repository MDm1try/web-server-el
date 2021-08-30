'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('accounts', {
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
        compound_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        provider_type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        provider_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        provider_account_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        refresh_token: Sequelize.STRING,
        access_token: Sequelize.STRING,
        access_token_expires: Sequelize.DATE,
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
        queryInterface.addIndex('accounts', ['compound_id'], { unique: true })
      )
      .then(() =>
        queryInterface.addIndex('accounts', [
          'provider_account_id',
          'provider_id',
          'user_id',
        ])
      );
  },

  down: async (queryInterface) => {
    return queryInterface
      .dropTable('accounts')
      .then(() =>
        queryInterface.removeIndex('accounts', [
          'compound_id',
          'provider_account_id',
          'provider_id',
          'user_id',
        ])
      );
  },
};
