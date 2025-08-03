import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Admin extends Model {}

Admin.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, tableName: "Admin", timestamps: false });
