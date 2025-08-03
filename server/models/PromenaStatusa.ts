import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class PromenaStatusa extends Model {}

PromenaStatusa.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  novi_status_voznje: DataTypes.INTEGER,
  vreme: DataTypes.DATE,
}, { sequelize, tableName: "PromenaStatusa", timestamps: false });
