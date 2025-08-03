import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Dispecer extends Model {}

Dispecer.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ime: { type: DataTypes.STRING, allowNull: false },
  prezime: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  broj_telefona: { type: DataTypes.STRING(13), allowNull: false },
}, { sequelize, tableName: "Dispecer", timestamps: false });
