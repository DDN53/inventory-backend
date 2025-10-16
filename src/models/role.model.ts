import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

interface RoleAttributes {
  id: number;
  name: string;
  description?: string;
}

export class Role extends Model<RoleAttributes> {
  declare id: number;
  declare name: string;
  declare description?: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "role",
    tableName: "roles",
  }
);