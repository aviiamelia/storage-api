import {
  createUser,
  CreateUserModel,
} from "../../../domain/useCases/createUser";
import { UserModel } from "../../../domain/models/userModel";
import { Encrypter } from "../../protocols/encrypter";

export class DbCreateUser implements createUser {
  private readonly encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async create(user: CreateUserModel): Promise<UserModel> {
    const data = {
      ...user,
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.encrypter.encrypt(user.password);
    return new Promise((resolve) => resolve(data));
  }
}
