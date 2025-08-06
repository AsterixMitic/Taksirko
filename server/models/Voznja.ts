import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Voznja extends Model {}

Voznja.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  pocetna_lokacija_id: { type: DataTypes.INTEGER, allowNull: false },
  krajnja_lokacija_id: { type: DataTypes.INTEGER, allowNull: false },
  vreme_pocetka: { type: DataTypes.DATE, allowNull: false },
  ocekivano_vreme_dolaska: DataTypes.DATE,
  cena: DataTypes.DECIMAL(10, 2),
  nacin_placanja: DataTypes.STRING,
  trazeni_jezik_id: DataTypes.INTEGER,
  broj_leta: DataTypes.STRING(6),
  napomena: DataTypes.STRING,
  recenzija: DataTypes.STRING,
  status_voznje: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  povratak: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  cekanje: DataTypes.STRING,
  vozac_id: { type: DataTypes.INTEGER, allowNull: false },
  vozilo_id: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, tableName: "Voznja", timestamps: false });
