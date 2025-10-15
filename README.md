🧾 Inventory Management Backend

A modern Inventory Management System Backend built using Node.js, Express, TypeScript, and Sequelize ORM.
It supports authentication, role management, products, warehouses, and stock ledgers — perfect for learning and real use.

🚀 Features

✅ Authentication (JWT-based)
✅ Role-Based Access Control (RBAC) (Admin / Manager / Clerk)
✅ Product Management (CRUD operations)
✅ Warehouse Management
✅ Stock Ledger (track stock movements)
✅ Sequelize ORM with MySQL or SQL Server
✅ TypeScript + Express + ESM setup
✅ Environment-based configuration (.env)

🧱 Project Structure
inventory-backend/
│
├── src/
│   ├── config/            # DB connection config
│   │   └── db.ts
│   ├── models/            # Sequelize models
│   │   ├── index.ts
│   │   ├── user.model.ts
│   │   ├── role.model.ts
│   │   ├── product.model.ts
│   │   ├── warehouse.model.ts
│   │   └── stockLedger.model.ts
│   ├── routes/            # API routes
│   │   └── index.ts
│   ├── controllers/       # Controller logic
│   ├── middleware/        # Auth middlewares
│   ├── index.ts           # Main app entry
│   └── server.ts          # (optional server startup)
│
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone this repository
git clone https://github.com/your-username/inventory-backend.git
cd inventory-backend

2️⃣ Install dependencies
npm install

⚙️ Environment Configuration

Create a .env file in the root directory:

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=12345
DB_NAME=inventory_db
DB_DIALECT=mysql  # or mssql

🧩 TypeScript Configuration

Make sure tsconfig.json looks like this:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}

⚙️ Scripts (package.json)
{
  "type": "module",
  "scripts": {
    "dev": "ts-node-esm src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}

🗄️ Database Configuration

This backend uses Sequelize ORM.
You can choose your database dialect:

MySQL → install mysql2

SQL Server → install tedious

To use migrations (optional):

npx sequelize-cli init

▶️ Run in Development
npm run dev


Output should be:

✅ Database Connected Successfully
✅ All models synced successfully!
🚀 Server running on port 4000

🏗️ Build & Run Production
npm run build
npm start

🧩 API Example
GET /

Response

{
  "message": "Inventory Management API running..."
}

Future Routes

/api/auth/register – Register new user

/api/auth/login – Login (JWT)

/api/products – CRUD for products

/api/warehouses – CRUD for warehouses

/api/stock-ledgers – Record stock movements

📦 Technologies Used
Category	Technology
Language	TypeScript
Backend Framework	Express.js
ORM	Sequelize
Database	MySQL / SQL Server
Auth	JWT, bcrypt
Security	Helmet, CORS
Dev Tools	ts-node, ts-node-dev, dotenv
🧠 Developer Guide
Add New Model

Create file in /src/models

Define model fields using Sequelize

Add to models/index.ts

Run await sequelize.sync() (auto sync)

Add New Route

Create route file in /src/routes

Add controller & logic

Import route in index.ts:

app.use("/api/products", productRoutes);

🧰 Troubleshooting
Error	Fix
Unknown file extension ".ts"	Run using ts-node-esm instead of node
Must use import to load ES Module	Add "type": "module" to package.json
Database connection failed	Check .env values and DB service
DeprecationWarning: fs.Stats constructor	Safe to ignore; Node warning only
🧑‍💻 Author

Developed by: Dinuka Munasinghe (DDN53)

🪄 Next Steps

✅ Add Authentication (JWT + bcrypt)
✅ Implement Role Permissions
✅ Create CRUD for Products / Warehouses
✅ Add Stock Posting (Purchase / Sale / Transfer)
✅ Add Report Endpoints (Stock On Hand, Movement)
✅ Connect with React Frontend
