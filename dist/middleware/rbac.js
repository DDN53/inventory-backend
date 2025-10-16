import { Role } from "../models/role.model.js";
import { Permission } from "../models/permission.model.js";
export const requirePermission = (permissionName) => {
    return async (req, res, next) => {
        const roleId = req.user?.roleId;
        if (!roleId)
            return res.status(403).json({ message: "No role" });
        const role = await Role.findByPk(roleId, { include: [Permission] });
        if (!role)
            return res.status(403).json({ message: "Invalid role" });
        const hasPermission = role.permissions?.some((p) => p.name === permissionName);
        if (!hasPermission)
            return res.status(403).json({ message: "No permission" });
        next();
    };
};
