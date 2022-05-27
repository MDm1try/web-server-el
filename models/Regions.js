'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Regions = sequelize.define(
    'Regions',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      normalizedName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ukName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ruName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'regions',
      defaultScope: {
        attributes: ['id', 'normalizedName', 'ukName', 'ruName'],
      },
      underscored: true,
    }
  );

  return Regions;
};
