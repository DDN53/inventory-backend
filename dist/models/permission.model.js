import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./role.model.js";
export class Permission extends Model {
}
// 🧱 Permission table definition
Permission.init({
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
}, {
    sequelize,
    modelName: "permission",
    tableName: "permissions",
    timestamps: false,
});
// 🔗 Many-to-Many relationship between Role ↔ Permission
export const RolePermission = sequelize.define("role_permission", {
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    }
}, { timestamps: false, tableName: "role_permissions" });
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" });
