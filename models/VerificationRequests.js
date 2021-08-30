'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const VerificationRequest = sequelize.define(
    'VerificationRequest',
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
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
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

  //   VerificationRequest.associate = function (models) {
  //     VerificationRequest.belongsTo(models.User, { foreignKey: 'userId' });
  //   };
  return VerificationRequest;
};
