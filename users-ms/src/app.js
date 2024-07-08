import express from "express";
import { connectDB } from "./db/mysql_db.js";
import UserRoutes from "./routes/UserRoutes.js";
import axios from "axios";

const app = express();

app.use(express.json());

app.use(UserRoutes);

const registerService = async () => {
  try {
    await axios.post(`${process.env.SERVICE_REGISTRY_URL}/register`, {
      name: `${process.env.APP_NAME}`,
      url: `http://localhost:${process.env.PORT}`,
    });
    console.log(`Service ${process.env.APP_NAME} registered successfully`);
  } catch (error) {
    console.error("Error registering service");
  }
};

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Users microservice is running on port ${process.env.PORT}`);
  });
  registerService();
});
