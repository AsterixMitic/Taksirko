import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Lokacija extends Model {}

Lokacija.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  adresa: { type: DataTypes.STRING },
  naziv: { type: DataTypes.STRING },
  latituda: { type: DataTypes.DECIMAL(7,5) },
  longituda: { type: DataTypes.DECIMAL(8,5) },
}, { sequelize, tableName: "Lokacija" });
