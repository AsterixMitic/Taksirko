import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Firma extends Model {}

Firma.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  naziv: { type: DataTypes.STRING, allowNull: false },
  pib: { type: DataTypes.STRING(15), allowNull: false },
}, { sequelize, tableName: "Firma" });
