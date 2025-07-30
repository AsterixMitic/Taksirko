import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Putnik extends Model {}

Putnik.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ime: { type: DataTypes.STRING },
  prezime: { type: DataTypes.STRING },
  broj_telefona: { type: DataTypes.STRING(13) },
}, { sequelize, tableName: "Putnik", timestamps: false });
