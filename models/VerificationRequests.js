'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const VerificationRequests = sequelize.define(
    'VerificationRequests',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      identifier: {
        allowNull: false,
        type: DataTypes.STRING,
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
      tableName: 'verification_requests',
      defaultScope: {
        attributes: ['id'],
      },
      underscored: true,
    }
  );

  VerificationRequests.associate = function (models) {
    VerificationRequests.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return VerificationRequests;
};
