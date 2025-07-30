import { DataTypes, Model } from "sequelize";
import { sequelize } from "../repository/db";

export class Voznja extends Model {}

Voznja.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  pocetna_lokacija_id: { type: DataTypes.INTEGER },
  krajnja_lokacija_id: { type: DataTypes.INTEGER },
  vreme_pocetka: { type: DataTypes.DATE },
  ocekivano_vreme_dolaska: { type: DataTypes.DATE },
  cena: { type: DataTypes.DECIMAL(10,2) },
  nacin_placanja: { type: DataTypes.STRING },
  trazeni_jezik_id: { type: DataTypes.INTEGER },
  broj_leta: { type: DataTypes.STRING },
  napomena: { type: DataTypes.STRING },
  status_voznje: { type: DataTypes.INTEGER },
}, { sequelize, tableName: "Voznja", timestamps: false });
