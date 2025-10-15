import { sequelize } from "../config/db.js";
import { Role } from "./role.model.js";
import { User } from "./user.js";
import { Product } from "./product.model.js";
import { Warehouse } from "./warehouse.model.js";
import { StockLedger } from "./stockLedger.model.js";
export { sequelize, Role, User, Product, Warehouse, StockLedger };
export const syncModels = async () => {
    await sequelize.sync({ alter: true }); // or { force: true } for reset
    console.log("✅ All models synced successfully!");
};
