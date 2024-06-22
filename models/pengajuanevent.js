"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class PengajuanEvent extends Model {
    static associate(models) {
    PengajuanEvent.belongsTo(models.alumni, { foreignKey: 'alumni_id', targetKey: 'id', as: 'alumni' });
    PengajuanEvent.belongsTo(models.form_pengajuan_event, { foreignKey: 'pengajuan_event_id', targetKey: 'id',as: 'form' });
    }
}
PengajuanEvent.init(
    {
    alumni_id: { type: DataTypes.INTEGER, primaryKey: true},
    pengajuan_event_id: { type: DataTypes.INTEGER, primaryKey: true},
    status: DataTypes.STRING(255),
    deskripsi: DataTypes.TEXT,
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