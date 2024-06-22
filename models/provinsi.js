"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class Provinsi extends Model {
    static associate(models) {
        Provinsi.hasMany(models.formulir_alumni, { foreignKey: 'provinsi_nama', onDelete: 'CASCADE' });
    }
}
Provinsi.init(
    {
    id_prov: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    nama: DataTypes.STRING(255),
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "provinsi",
    },
    
);
return Provinsi;
};