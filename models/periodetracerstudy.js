"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class PeriodeTracerStudy extends Model {
    static associate(models) {
        PeriodeTracerStudy.belongsTo(models.admin, { foreignKey: 'admin_id', targetKey: 'id' });
        PeriodeTracerStudy.hasMany(models.detail_formulir, { foreignKey: 'periode_tracer_studyId', sourceKey: 'id' });
    }
}
PeriodeTracerStudy.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    nama_periode: DataTypes.STRING(255),
    keterangan: {type: DataTypes.TEXT, allowNull: true},
    tanggal_mulai: DataTypes.DATE,
    tanggal_akhir: DataTypes.DATE,
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