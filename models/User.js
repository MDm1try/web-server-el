'use strict';
const { USER_SEX, USER_ROLES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // for next-auth https://next-auth.js.org/adapters/typeorm/postgres
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        isLowercase: true,
      },
      emailVerified: DataTypes.DATE,
      image: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      // custom fields
      firstName: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('first_name', value.trim());
        },
      },
      lastName: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('last_name', value.trim());
        },
      },
      bio: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('bio', value.trim());
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
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'subscriber',
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
    },
    {
      tableName: 'users',
      defaultScope: {
        attributes: ['id', 'email'],
      },
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Session, { foreignKey: 'user_id' });
    User.hasOne(models.Account, { foreignKey: 'user_id' });
    User.hasMany(models.Post, { foreignKey: 'user_id' });
  };
  return User;
};
