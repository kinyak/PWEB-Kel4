"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class PeriodeTracerStudy extends Model {
    static associate(models) {
        PeriodeTracerStudy.belongsTo(models.admin, { foreignKey: 'admin_id', targetKey: 'id' });

    }
}
PeriodeTracerStudy.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    nama_periode: DataTypes.STRING(255),
    keterangan: {type: DataTypes.TEXT, allowNull: true},
    tanggal_mulai: DataTypes.DATE,
    tanggal_akhir: DataTypes.DATE,
    tanggal_tutup: DataTypes.STRING(255),
    admin_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "periode_tracer_study",
    }
);
return PeriodeTracerStudy;
};