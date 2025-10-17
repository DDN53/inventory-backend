import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./role.model.js";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare roleId: number;
  declare role?: Role;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
  }
);

User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role'
});
