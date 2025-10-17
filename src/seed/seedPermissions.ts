import { Permission } from "../models/permission.model.js";
import { Role } from "../models/role.model.js";
import { sequelize } from "../config/db.js";

export const seedPermissions = async () => {
  try {
    console.log("🌱 Starting permission seeding...");

  
    await sequelize.sync({ alter: true });

    
    const permissions = [
      { name: "product.create", description: "Can create products" },
      { name: "product.view", description: "Can view products" },
      { name: "product.update", description: "Can update products" },
      { name: "product.delete", description: "Can delete products" },
    ];

 
    for (const p of permissions) {
      await Permission.findOrCreate({ where: { name: p.name } });
    }


    const adminRole = await Role.findOne({ where: { name: "ADMIN" } });

    if (!adminRole) {
      console.log("⚠️ ADMIN role not found. Please seed roles first!");
      return;
    }

   
    const allPermissions = await Permission.findAll();

   
    await (adminRole as any).setPermissions(allPermissions);

    console.log("✅ Permissions successfully linked to ADMIN role!");
    console.log("🎉 Permission seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding permissions:", error);
  } finally {
    await sequelize.close();
  }
};
