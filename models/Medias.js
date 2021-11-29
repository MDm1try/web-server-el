'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Medias = sequelize.define(
    'Medias',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      md5Hash: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'media',
      defaultScope: {
        attributes: ['id', 'url', 'contentType', 'md5Hash'],
      },
      underscored: true,
    }
  );

  Medias.associate = function (models) {
    Medias.belongsTo(models.Posts, { foreignKey: 'postId' });
  };

  return Medias;
};
