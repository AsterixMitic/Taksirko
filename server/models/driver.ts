import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export class Driver extends Model {
  public id!: number;
  public name!: string;
  public licenseNumber!: string;
  public phone!: string;
  public carModel!: string;
}

Driver.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "drivers",
  }
);