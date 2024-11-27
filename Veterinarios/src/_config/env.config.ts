import { config } from "dotenv";
import Joi from "joi";

config();

// Validación de las variables de entorno
const envSchema = Joi.object({
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  RABBIT_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_SESSION_TOKEN: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Extraer las variables validadas
const {
  PORT,
  JWT_SECRET,
  JWT_EXPIRATION,
  RABBIT_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
} = envVars;

// Interfaz para las variables de entorno
interface Env {
  port: {
    PORT: number;
  };
  jwt: {
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  };
  rabbitmq: {
    RABBIT_URL: string;
  };
  aws: {
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SESSION_TOKEN: string;
    AWS_REGION: string;
    AWS_S3_BUCKET_NAME: string;
  };
}

// Exportar la configuración como un objeto estructurado
export const env: Env = {
  port: {
    PORT: PORT,
  },
  jwt: {
    JWT_SECRET: JWT_SECRET,
    JWT_EXPIRATION: JWT_EXPIRATION,
  },
  rabbitmq: {
    RABBIT_URL: RABBIT_URL,
  },
  aws: {
    AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
    AWS_SESSION_TOKEN: AWS_SESSION_TOKEN,
    AWS_REGION: AWS_REGION,
    AWS_S3_BUCKET_NAME: AWS_S3_BUCKET_NAME,
  },
};
