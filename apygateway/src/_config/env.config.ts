import { config } from "dotenv";
import Joi from "joi";

config();

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  USERS_SERVICE_URL: Joi.string().uri().required(),
  VETERINARIOS_SERVICE_URL: Joi.string().uri().required(),
  SOLICITUDES_SERVICE_URL: Joi.string().uri().required(),
  NOTIFICATIONS_SERVICE_URL: Joi.string().uri().required(),
  MASCOTA_SERVICE_URL: Joi.string().uri().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  PORT,
  USERS_SERVICE_URL,
  VETERINARIOS_SERVICE_URL,
  SOLICITUDES_SERVICE_URL,
  NOTIFICATIONS_SERVICE_URL,
  MASCOTA_SERVICE_URL,
} = envVars;

interface Env {
  port: {
    PORT: number;
  };
  services: {
    USERS_SERVICE_URL: string;
    VETERINARIOS_SERVICE_URL: string;
    SOLICITUDES_SERVICE_URL: string;
    NOTIFICATIONS_SERVICE_URL: string;
    MASCOTA_SERVICE_URL: string;
  };
}

export const env: Env = {
  port: {
    PORT: PORT,
  },
  services: {
    USERS_SERVICE_URL: USERS_SERVICE_URL,
    VETERINARIOS_SERVICE_URL: VETERINARIOS_SERVICE_URL,
    SOLICITUDES_SERVICE_URL: SOLICITUDES_SERVICE_URL,
    NOTIFICATIONS_SERVICE_URL: NOTIFICATIONS_SERVICE_URL,
    MASCOTA_SERVICE_URL: MASCOTA_SERVICE_URL,
  },
};