import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  sendPasswordResetCodeController,
} from "../dependencyInjection";

const authRoutes = Router();

// Rutas para autenticación
authRoutes.post(
  "/register",
  registerUserController.handle.bind(registerUserController)
);

authRoutes.post(
  "/login",
  loginUserController.handle.bind(loginUserController)
);

// Ruta para enviar código de verificación para restablecer contraseña
authRoutes.post(
  "/password-reset",
  sendPasswordResetCodeController.handle.bind(sendPasswordResetCodeController)
);

export { authRoutes };
