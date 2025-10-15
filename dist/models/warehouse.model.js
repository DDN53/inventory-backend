import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
export class Warehouse extends Model {
}
Warehouse.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
}, { sequelize, modelName: "warehouse" });
