import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Vozilo extends Model {}

Vozilo.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  redni_broj: { type: DataTypes.INTEGER },
  registracija: { type: DataTypes.STRING(10) },
  marka: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  boja: { type: DataTypes.STRING },
  karoserija: { type: DataTypes.STRING },
  broj_putnika: { type: DataTypes.STRING },
  gorivo: { type: DataTypes.STRING },
  godiste: { type: DataTypes.INTEGER },
}, { sequelize, tableName: "Vozilo", timestamps: false });
