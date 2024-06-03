"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class Laporan extends Model {
    static associate(models) {
        Laporan.belongsTo(models.admin, { foreignKey: 'admin_id', targetKey: 'id' });

    }
}
Laporan.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    judul: DataTypes.STRING(255),
    konten: DataTypes.TEXT,
    jenis_laporan: DataTypes.STRING(255),
    admin_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "laporan",
    }
);
return Laporan;
};