"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alumni extends Model {
    static associate(models) {
      Alumni.belongsTo(models.role, { foreignKey: 'roleId', targetKey: 'id' });
      Alumni.belongsToMany(models.formulir_alumni, { through: models.detail_formulir, foreignKey: 'alumni_id', otherKey: 'formulir_id' });
      Alumni.belongsToMany(models.form_pengajuan_event, { through: models.pengajuan_event, foreignKey: 'alumni_id', otherKey: 'pengajuan_event_id',  });

    }
  }
  Alumni.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
      nim: DataTypes.STRING(255),
      email: DataTypes.STRING(255),
      name: DataTypes.STRING(256),
      password: DataTypes.STRING(255),
      roleId: { type: DataTypes.INTEGER, field: 'roleId' },
      gambar: {
        type: DataTypes.STRING(255)
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "alumni",
    }
  );
  return Alumni;
};