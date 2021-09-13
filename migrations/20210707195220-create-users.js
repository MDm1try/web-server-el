'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users', {
        // for next-auth https://next-auth.js.org/adapters/typeorm/postgres
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        email_verified: Sequelize.DATE,
        image: Sequelize.TEXT,
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
        // custom fields
        first_name: {
          type: Sequelize.STRING,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        bio: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        sex: {
          type: Sequelize.ENUM,
          values: ['m', 'w', 'n'],
        },
        password: {
          type: Sequelize.STRING,
        },
        role: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ['admin', 'subscriber'],
          defaultValue: 'subscriber',
        },
        blocked: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      })
      .then(() =>
        queryInterface.addIndex('users', ['email'], {
          unique: true,
        })
      );
  },
  down: (queryInterface) => {
    return queryInterface
      .dropTable('users')
      .then(() => queryInterface.removeIndex('users', ['email']));
  },
};
