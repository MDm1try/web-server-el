'use strict';
const {
  POST_STATUSES,
  POST_CURRENCIES,
  POST_TYPES,
  POST_PURPOSES,
  POST_STATUS_MAP,
} = require('../constants');

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
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          validTypes(value) {
            if (!POST_TYPES.includes(value)) {
              throw new Error('Invalid the post type: ' + value);
            }
          },
        },
      },
      status: {
        type: DataTypes.ENUM(...POST_STATUSES),
        allowNull: false,
        defaultValue: POST_STATUS_MAP.INACTIVE,
      },
      purpose: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          validTypes(value) {
            if (!POST_PURPOSES.includes(value)) {
              throw new Error('Invalid the post purpose: ' + value);
            }
          },
        },
      },
      name: {
        type: DataTypes.TEXT,
        set(value) {
          value && this.setDataValue('name', value.trim());
        },
      },
      description: {
        type: DataTypes.TEXT,
        set(value) {
          value && this.setDataValue('description', value.trim());
        },
      },
      cadNum: {
        type: DataTypes.STRING,
        set(value) {
          value && this.setDataValue('name', value.trim());
        },
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      currency: {
        type: DataTypes.ENUM(...POST_CURRENCIES),
        allowNull: false,
      },
      areaHectares: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      shape: {
        type: DataTypes.JSON, // [{lat: number, lng: number}]
        allowNull: false,
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
        attributes: ['id', 'name'],
      },
      underscored: true,
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Media, { foreignKey: 'postId' });
  };

  return Post;
};
