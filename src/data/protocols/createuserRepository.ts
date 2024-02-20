import { UserModel } from "../../domain/models/userModel";
import { CreateUserModel } from "../../domain/useCases/createUser";

export interface UserRepositoryInterface {
  create(userdata: CreateUserModel): Promise<UserModel>;
}
