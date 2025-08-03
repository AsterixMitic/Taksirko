import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Odsustvo extends Model {}

Odsustvo.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    vozac_id: { type: DataTypes.INTEGER, allowNull: false },
    pocetni_datum: { type: DataTypes.DATEONLY, allowNull: false },
    krajnji_datum: DataTypes.DATEONLY,
    razlog_odsustva: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, tableName: "Odsustvo", timestamps: false });
