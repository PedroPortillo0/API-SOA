import { pool } from "../_config/db.config";

export async function connectWithRetry(retries = 5, delay = 1000, callback = () => {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await pool.connect(); 
      console.log("✅ Database connection successful");

      connection.release(); 
      callback(); 
      return; 
    } catch (error) {
      console.error(`❌ Error connecting to the database (Attempt ${attempt}/${retries}):`, error);

      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds... ⏳`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error("❌ Failed to connect to the database after multiple attempts.");
  process.exit(1); 
}
