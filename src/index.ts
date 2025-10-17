import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/db.js";
import { sequelize } from "./models/index.js";
import "./models/index.js";
import { router as productRouter } from "./routers/product.route.js";
import { router as authRouter } from "./routers/auth.route.js";

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

(async () => {
  try {
    await connectDB();          
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
})();
