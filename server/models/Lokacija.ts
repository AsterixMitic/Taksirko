import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Lokacija extends Model {}

Lokacija.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  adresa: DataTypes.STRING,
  naziv: DataTypes.STRING,
  latituda: DataTypes.DECIMAL(10, 5),
  longituda: DataTypes.DECIMAL(10, 5),
}, { sequelize, tableName: "Lokacija", timestamps: false });
