
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        fisrtName: {
            type: DataTypes.STRING,
            set(value) {
                value && this.setDefaultValue("firstName", value.trim())
            }
        },
        lastName: {
            type: DataTypes.STRING,
            set(value) {
                value && this.setDefaultValue("firstName", value.trim())
            }
        },
        phone: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    })

    // User.associate = function(models) {
    //     User.hasMany(models.Member, { foreignKey: "userId" })
    // }

    return User
}