"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class LowonganPekerjaan extends Model {
    static associate(models) {
        LowonganPekerjaan.belongsTo(models.admin, { foreignKey: 'admin_id', targetKey: 'id' });

    }
}
LowonganPekerjaan.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    judul: DataTypes.STRING(255),
    deskripsi: DataTypes.TEXT,
    tanggal_tutup: DataTypes.STRING(255),
    admin_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "lowongan_pekerjaan",
    }
);
return LowonganPekerjaan;
};