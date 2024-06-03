"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class Role extends Model {
    static associate(models) {
    Role.hasMany(models.alumni, { foreignKey: 'roleId' });
    Role.hasMany(models.admin, { foreignKey: 'roleId' });
    }
}
Role.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    role: DataTypes.STRING(255)
    },
    {
    sequelize,
    modelName: "role",
    }
);
return Role;
};