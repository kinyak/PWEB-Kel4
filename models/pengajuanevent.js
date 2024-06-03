"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class PengajuanEvent extends Model {
    static associate(models) {
        PengajuanEvent.belongsTo(models.alumni, { foreignKey: 'form_pengajuan_event_id', targetKey: 'id' });

    }
}
PengajuanEvent.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    status: DataTypes.STRING(255),
    deskripsi: DataTypes.TEXT,
    tanggal_tutup: DataTypes.STRING(255),
    alumni_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
    sequelize,
    modelName: "pengajuan_event",
    }
);
return PengajuanEvent;
};