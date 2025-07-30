import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || "localhost";

if (!dbName || !dbUser || !dbPassword) {
  throw new Error("Database credentials are not set in .env file");
}

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false,
  // Kasnije za produkciju kada se hostuje:
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});