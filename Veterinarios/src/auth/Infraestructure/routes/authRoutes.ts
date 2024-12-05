import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../dependencyInyection";
import { upload } from "../../../_shared/middlewares/multer";

const authRoutes = Router();

// Rutas para autenticación
authRoutes.post(
  "/register",
  upload.single('image'),  // 'image' es el nombre del campo en el formulario
  registerUserController.handle.bind(registerUserController)
);


authRoutes.post(
  "/login",
  loginUserController.handle.bind(loginUserController)
);

export { authRoutes };


