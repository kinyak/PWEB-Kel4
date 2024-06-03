"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class FormPengajuanEvent extends Model {
    static associate(models) {
        FormPengajuanEvent.belongsTo(models.pengajuan_event, { foreignKey: 'pengajuan_event_id', targetKey: 'id' });

    }
}
FormPengajuanEvent.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    judul: DataTypes.STRING(255),
    deskripsi: DataTypes.TEXT,
    tanggal_event: DataTypes.STRING(255),
    pengajuan_event_id: DataTypes.INTEGER,
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