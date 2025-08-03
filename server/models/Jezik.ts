import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Jezik extends Model {}

Jezik.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ime: { type: DataTypes.STRING(3), allowNull: false },
}, { sequelize, tableName: "Jezik", timestamps: false });
