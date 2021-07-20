'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
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
      areaHa: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'block', 'trash'],
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Posts');
  },
};
