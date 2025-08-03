import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Vozac extends Model {}

Vozac.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ime: { type: DataTypes.STRING, allowNull: false },
  prezime: { type: DataTypes.STRING, allowNull: false },
  jmbg: { type: DataTypes.STRING(13), allowNull: false },
  slika_url: DataTypes.STRING,
  broj_telefona: { type: DataTypes.STRING(13), allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  trenutno_zaposljen: { type: DataTypes.BOOLEAN, allowNull: false },
  napomena: DataTypes.STRING,
}, { sequelize, tableName: "Vozac", timestamps: false });
