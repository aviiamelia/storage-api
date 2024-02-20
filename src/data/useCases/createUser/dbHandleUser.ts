import { createUser, CreateUserModel } from "../../../domain/useCases/createUser";
import { UserModel } from "../../../domain/models/userModel";
import { Encrypter } from "../../protocols/encrypter";
import { UserRepositoryInterface } from "../../protocols/createuserRepository";

export class DbHandleUser implements createUser {
  private readonly encrypter;
  private readonly creatuserRepository;
  constructor(encrypter: Encrypter, creatuserRepository: UserRepositoryInterface) {
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
