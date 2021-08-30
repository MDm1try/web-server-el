'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
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
      description: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      currency: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['USD', 'EUR', 'UAH'],
      },
      type: {
        type: Sequelize.NUMERIC,
      },
      area_hectares: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'block', 'trash'],
      },
      published_at: {
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
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('posts');
  },
};
