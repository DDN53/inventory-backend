import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
export class Product extends Model {
}
Product.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    unit: { type: DataTypes.STRING, allowNull: false },
    reorderLevel: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, modelName: "product" });
