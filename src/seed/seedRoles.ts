import { Role } from "../models/role.model.js";

export const seedRoles = async () => {
  const defaultRoles = ["ADMIN", "MANAGER", "CLERK"];
  for (const name of defaultRoles) {
    const [_, created] = await Role.findOrCreate({
      where: { name },
      defaults: { name, description: `${name} role` },
    });
    if (created) console.log(`✅ Role '${name}' created`);
  }
};
