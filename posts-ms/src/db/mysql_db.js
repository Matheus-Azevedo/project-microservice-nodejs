import { sequelize } from "./instances/mysql.js";

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
