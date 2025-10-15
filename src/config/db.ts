import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "inventory_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "12345",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql", // or "mssql"
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};
