import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { syncModels } from "./models/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Inventory Management API running..." });
});

const PORT = process.env.PORT || 4000;


(async () => {
  await connectDB();
  await syncModels();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();