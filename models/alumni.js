"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alumni.init(
    {
      nim: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      departemen: DataTypes.STRING,
      pekerjaan: DataTypes.STRING,
      perusahaan: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      role: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "alumni",
    }
  );
  return alumni;
};
