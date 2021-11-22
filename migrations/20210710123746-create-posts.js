'use strict';

const {
  POST_STATUSES,
  POST_CURRENCIES,
  POST_TYPES,
  POST_PURPOSES,
} = require('../constants/post');

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
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
        values: POST_TYPES,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: POST_STATUSES,
      },
      purpose: {
        allowNull: false,
        type: Sequelize.INTEGER,
        values: POST_PURPOSES,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cad_num: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      currency: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: POST_CURRENCIES,
      },
      area_hectares: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      shape: {
        type: Sequelize.JSON, // [{lat: number, lng: number}]
        allowNull: false,
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
