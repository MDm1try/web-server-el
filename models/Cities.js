'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    'Cities',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'regions',
          key: 'id',
        },
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      zoom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      radius: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hasDistricts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      tableName: 'cities',
      defaultScope: {
        attributes: [
          'id',
          'zoom',
          'longitude',
          'latitude',
          'normalizedName',
          'ukName',
          'ruName',
        ],
      },
      underscored: true,
    }
  );

  Cities.associate = function (models) {
    Cities.belongsTo(models.Regions, { foreignKey: 'regionId', as: 'region' });
  };

  return Cities;
};
