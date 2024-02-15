import { createUser, CreateUserModel } from "../../../domain/useCases/createUser";
import { UserModel } from "../../../domain/models/userModel";
import { Encrypter } from "../../protocols/encrypter";
import { UserRepository } from "../../protocols/createuserRepository";

export class DbCreateUser implements createUser {
  private readonly encrypter;
  private readonly creatuserRepository;
  constructor(encrypter: Encrypter, creatuserRepository: UserRepository) {
    this.encrypter = encrypter;
    this.creatuserRepository = creatuserRepository;
  }

  async create(userData: CreateUserModel): Promise<UserModel> {
    const hashedPassword = await this.encrypter.encrypt(userData.password);
    const user = this.creatuserRepository.create(
      Object.assign({}, userData, { password: hashedPassword })
    );
    return new Promise((resolve) => resolve(user));
  }
}
