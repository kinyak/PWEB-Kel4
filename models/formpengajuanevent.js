"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class FormPengajuanEvent extends Model {
    static associate(models) {
        FormPengajuanEvent.belongsToMany(models.alumni, { through: models.pengajuan_event, foreignKey: 'pengajuan_event_id', otherKey: 'alumni_id', as: 'form', });
        FormPengajuanEvent.hasMany(models.pengajuan_event, { foreignKey: 'pengajuan_event_id', onDelete: 'CASCADE' });
    }
}
FormPengajuanEvent.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    judul: DataTypes.STRING(255),
    deskripsi: DataTypes.TEXT,
    tanggal_event: DataTypes.STRING(255),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "form_pengajuan_event",
    }
);
return FormPengajuanEvent;
};