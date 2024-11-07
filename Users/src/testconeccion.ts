import { Pool } from "pg";

process.loadEnvFile();

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.PORT || "5432"),
});

const connectionDB = async () => {
  try {
    await connection.connect();    
    console.log("Connection to database success");
  } catch (error) {
    console.log("Connection to database failed");
  }
};

connectionDB();

