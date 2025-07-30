import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Vozac extends Model {}

Vozac.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ime: { type: DataTypes.STRING },
  prezime: { type: DataTypes.STRING },
  jmbg: { type: DataTypes.STRING(13) },
  slika_url: { type: DataTypes.STRING },
  broj_telefona: { type: DataTypes.STRING(13) },
}, { sequelize, tableName: "Vozac", timestamps: false });
