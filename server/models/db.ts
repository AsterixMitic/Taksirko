import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('taksirko_db', 'root', 'password', 
{
  host: 'localhost',
  dialect: 'mysql',
});