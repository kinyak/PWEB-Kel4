"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class Artikel extends Model {
    static associate(models) {
        Artikel.belongsTo(models.admin, { foreignKey: 'admin_id', targetKey: 'id' });

    }
}
Artikel.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    judul: DataTypes.STRING(255),
    konten: DataTypes.TEXT,
    gambar: DataTypes.STRING(255),
    kategori: DataTypes.STRING(255),
    admin_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "artikel",
    }
);
return Artikel;
};