import { sequelize } from "../config/db.js";
import { Role } from "./role.model.js";
import { User } from "./user.model.js";
import { Permission } from "./permission.model.js";
// Role ↔ User (1:N)
Role.hasMany(User, { foreignKey: "roleId", as: "users" });
User.belongsTo(Role, { foreignKey: "roleId", as: "userRole" });
// Role ↔ Permission (M:N)
export const RolePermission = sequelize.define("role_permission", {}, { timestamps: false, tableName: "role_permissions" });
Role.belongsToMany(Permission, { through: RolePermission, as: "permissions" });
Permission.belongsToMany(Role, { through: RolePermission, as: "roles" });
// Export all
export { sequelize, Role, User, Permission };
