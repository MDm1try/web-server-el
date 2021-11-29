'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const VerificationTokens = sequelize.define(
    'VerificationTokens',
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
      type: {
        // todo
        allowNull: false,
        type: DataTypes.STRING,
      },
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expires: {
        allowNull: false,
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
      tableName: 'verification_tokens',
      defaultScope: {
        attributes: ['id', 'userId', 'used', 'type', 'expires', 'token'],
      },
      underscored: true,
    }
  );

  VerificationTokens.associate = function (models) {
    VerificationTokens.belongsTo(models.Users, { foreignKey: 'userId' });
  };

  return VerificationTokens;
};
