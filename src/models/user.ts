import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./role.model.js";

export class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare passwordHash: string;
  }
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "user" }
  );
  Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });