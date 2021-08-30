'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
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
      refresh_token: DataTypes.STRING,
      access_token: DataTypes.STRING,
      access_token_expires: DataTypes.DATE,
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
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

  // User.associate = function(models) {
  //     User.hasMany(models.Member, { foreignKey: "userId" })
  // }
  return Account;
};
