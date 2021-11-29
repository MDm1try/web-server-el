'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define(
    'Sessions',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      sessionToken: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accessToken: {
        allowNull: false,
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
      tableName: 'sessions',
      defaultScope: {
        attributes: ['id'],
      },
      underscored: true,
    }
  );

  // User.associate = function(models) {
  //     User.hasMany(models.Member, { foreignKey: "userId" })
  // }
  return Sessions;
};
