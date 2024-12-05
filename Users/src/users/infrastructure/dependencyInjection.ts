import { pool } from "../../_config/db.config";

import { FindAllUsers } from "../application/use-cases/FindAllUsers";
import { FindUserById } from "../application/use-cases/FindUserById";
import { FindUserByUsername } from "../application/use-cases/FindUserByUsername";
import { FindUserByEmail } from "../application/use-cases/FindUserByEmail";
import { DeleteUserById } from "../application/use-cases/DeleteUserById";
import { UpdateUser } from "../application/use-cases/UpdateUser";

import { FindAllUsersController } from "./controllers/FindAllUsersController";
import { FindUserByIdController } from "./controllers/FindUserByIdController";
import { FindUserByUsernameController } from "./controllers/FindUserByUsernameController";
import { FindUserByEmailController } from "./controllers/FindUserByEmailController";
import { DeleteUserByIdController } from "./controllers/DeleteUserByIdController";
import { UpdateUserController } from "./controllers/UpdateUserController";

import { PostgresUserRepository } from "./persistence/PostgresUserRepository";

const userRepository = new PostgresUserRepository(pool);

const findAllUsers = new FindAllUsers(userRepository);
const findUserById = new FindUserById(userRepository);
const findUserByUsername = new FindUserByUsername(userRepository);
const findUserByEmail = new FindUserByEmail(userRepository);
const deleteUserById = new DeleteUserById(userRepository);
const updateUser = new UpdateUser(userRepository);

const findAllUsersController = new FindAllUsersController(findAllUsers);
const findUserByIdController = new FindUserByIdController(findUserById);
const findUserByUsernameController = new FindUserByUsernameController(
  findUserByUsername
);
const findUserByEmailController = new FindUserByEmailController(
  findUserByEmail
);
const deleteUserByIdController = new DeleteUserByIdController(deleteUserById);
const updateUserController = new UpdateUserController(updateUser);

export {
  userRepository,
  findAllUsersController,
  findUserByIdController,
  findUserByUsernameController,
  findUserByEmailController,
  deleteUserByIdController,
  updateUserController,
};
