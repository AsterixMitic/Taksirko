import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Dispecer extends Model {}

Dispecer.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ime: { type: DataTypes.STRING },
  prezime: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
  password_hash: { type: DataTypes.STRING },
  broj_telefona: { type: DataTypes.STRING(13) },
}, { sequelize, tableName: "Dispecer", timestamps: false });
