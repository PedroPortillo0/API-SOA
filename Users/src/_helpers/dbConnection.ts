import { pool } from "../_config/db.config";

export async function connect(callback: () => void) {
  try {
    await pool.connect();
    console.log("Database connection successful");
    callback();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}
