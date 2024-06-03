"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.role, { foreignKey: 'roleId', targetKey: 'id' });
      Admin.hasMany(models.artikel, { foreignKey: 'admin_id' });
      Admin.hasMany(models.lowongan_pekerjaan, { foreignKey: 'admin_id' });
      Admin.hasMany(models.periode_tracer_study, { foreignKey: 'admin_id' });
      Admin.hasMany(models.laporan, { foreignKey: 'admin_id' });
    }
  }
  Admin.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      roleId: { type: DataTypes.INTEGER, field: 'roleId' },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "admin",
    }
  );
  return Admin;
};