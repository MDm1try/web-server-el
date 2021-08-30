'use strict';

// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
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
      session_token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      access_token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
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
  return Session;
};
