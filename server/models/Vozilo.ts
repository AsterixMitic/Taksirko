import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Vozilo extends Model {}

Vozilo.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  redni_broj: { type: DataTypes.INTEGER, allowNull: false },
  registracija: { type: DataTypes.STRING(10), allowNull: false },
  marka: DataTypes.STRING,
  model: DataTypes.STRING,
  boja: DataTypes.STRING,
  karoserija: DataTypes.STRING,
  broj_putnika: { type: DataTypes.STRING, allowNull: false },
  gorivo: { type: DataTypes.STRING, allowNull: false },
  godiste: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, tableName: "Vozilo", timestamps: false });
