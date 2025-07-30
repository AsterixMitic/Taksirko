import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class PromenaStatusa extends Model {}

PromenaStatusa.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  novi_status_voznje: { type: DataTypes.INTEGER },
  vreme: { type: DataTypes.DATE },
}, { sequelize, tableName: "PromenaStatusa" });
