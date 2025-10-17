import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Permission extends Model {
  declare id: number;
  declare name: string;
  declare description?: string;
}

Permission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "permission",
    tableName: "permissions",
  }
);
