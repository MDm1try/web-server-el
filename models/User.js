'use strict';
const { USER_SEX, USER_ROLES } = require('../helpers/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('firstName', value.trim());
        },
      },
      lastName: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('lastName', value.trim());
        },
      },
      bio: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('bio', value.trim());
        },
      },
      email: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('email', value.trim().toLowerCase());
        },
      },
      phone: {
        type: DataTypes.INTEGER,
      },
      sex: {
        type: DataTypes.STRING,
        validate: {
          validTypes(value) {
            if (value || !USER_SEX.includes(value)) {
              throw new Error('Invalid sex type ' + value);
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('password', value.trim());
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          validTypes(value) {
            if (!value || !USER_ROLES.includes(value)) {
              throw new Error('Invalid role ' + value);
            }
          },
        },
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      defaultScope: {
        attributes: ['id', 'email'],
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Post, { foreignKey: 'userId' });
  };
  return User;
};
