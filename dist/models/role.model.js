import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
export class Role extends Model {
}
Role.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, { sequelize, modelName: "role" });
