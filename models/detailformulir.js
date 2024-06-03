"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class DetailFormulir extends Model {
    static associate(models) {
    DetailFormulir.belongsTo(models.alumni, { foreignKey: 'alumni_id', targetKey: 'id' });
    DetailFormulir.belongsTo(models.formulir_alumni, { foreignKey: 'formulir_id' , targetKey: 'id' });
    DetailFormulir.belongsTo(models.periode_tracer_study, { foreignKey: 'periode_tracer_studyId' , targetKey: 'id' });
    }
}
DetailFormulir.init(
    {
    alumni_id: { type: DataTypes.INTEGER, primaryKey: true },
    formulir_id: { type: DataTypes.INTEGER, primaryKey: true },
    periode_tracer_studyId: DataTypes.INTEGER,
    },
    {
    sequelize,
    modelName: "detail_formulir",
    timestamps: false
    }
);
return DetailFormulir;
};