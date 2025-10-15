import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Product } from "./product.model.js";
import { Warehouse } from "./warehouse.model.js";
export class StockLedger extends Model {
}
StockLedger.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    qtyChange: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    unitCost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    refType: { type: DataTypes.STRING, allowNull: true },
    refId: { type: DataTypes.INTEGER, allowNull: true },
}, { sequelize, modelName: "stockLedger" });
Product.hasMany(StockLedger, { foreignKey: "productId" });
Warehouse.hasMany(StockLedger, { foreignKey: "warehouseId" });
StockLedger.belongsTo(Product, { foreignKey: "productId" });
StockLedger.belongsTo(Warehouse, { foreignKey: "warehouseId" });
