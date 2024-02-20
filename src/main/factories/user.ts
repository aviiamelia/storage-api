import { UserController } from "../../presentation/controllers/signUp";
import { ValuesValidatorAdapter } from "../../utils/valuesValidator.adapter";
import { DbHandleUser } from "../../data/useCases/user/dbHandleUser";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { UserRepository } from "../../infra/db/repositories/userRepository/userRepository";

export const makeUserController = (): UserController => {
  const valuesValidatorAdapter = new ValuesValidatorAdapter();
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter(12);
  const dbHandleUser = new DbHandleUser(bcryptAdapter, userRepository);
  const userController = new UserController(valuesValidatorAdapter, dbHandleUser);
  return userController;
};
