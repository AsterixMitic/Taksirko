import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Povratak extends Model {}

Povratak.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  vreme_pocetka: { type: DataTypes.DATE },
  ocekivano_vreme_dolaska: { type: DataTypes.DATE },
  status_voznje: { type: DataTypes.INTEGER },
  cekanje: { type: DataTypes.INTEGER },
}, { sequelize, tableName: "Povratak" });
