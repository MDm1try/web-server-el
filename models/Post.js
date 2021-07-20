'use strict';
const { POST_STATUSES, POST_CURRENCIES } = require('../helpers/constants');

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.UUID,
      },
      description: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('description', value.trim());
        },
      },
      address: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('address', value.trim());
        },
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      currency: {
        type: DataTypes.STRING,
        validate: {
          validTypes(value) {
            if (value || !POST_CURRENCIES.includes(value)) {
              throw new Error('Invalid currency type' + value);
            }
          },
        },
      },
      type: {
        type: DataTypes.NUMERIC,
      },
      areaHa: {
        type: DataTypes.NUMERIC,
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          validTypes(value) {
            if (value || !POST_STATUSES.includes(value)) {
              throw new Error('Invalid the post status' + value);
            }
          },
        },
      },
      publishedAt: {
        type: DataTypes.DATE,
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
        attributes: ['id', 'description'],
      },
    }
  );

  // User.associate = function(models) {
  //     User.hasMany(models.Member, { foreignKey: "userId" })
  // }
  return Post;
};
