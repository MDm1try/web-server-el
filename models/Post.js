'use strict';
const { POST_STATUSES, POST_CURRENCIES } = require('../constants');

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
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
      area_hectares: {
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
      published_at: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'posts',
      defaultScope: {
        attributes: ['id', 'description'],
      },
      underscored: true,
    }
  );

  // User.associate = function(models) {
  //     User.hasMany(models.Member, { foreignKey: "userId" })
  // }
  return Post;
};
