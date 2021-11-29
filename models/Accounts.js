'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define(
    'Accounts',
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
      compoundId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerAccountId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      refreshToken: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      accessTokenExpires: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'accounts',
      defaultScope: {
        attributes: ['id'],
      },
      underscored: true,
    }
  );

  Accounts.associate = function (models) {
    Accounts.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Accounts;
};
