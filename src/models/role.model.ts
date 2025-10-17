import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.js";

interface RoleAttributes {
  id: number;
  name: string;
  description?: string;
}

type RoleCreationAttributes = Optional<RoleAttributes, "id">;

export class Role extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes {
  declare id: number;
  declare name: string;
  declare description?: string;
}

Role.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "role",
    tableName: "roles",
  }
);
