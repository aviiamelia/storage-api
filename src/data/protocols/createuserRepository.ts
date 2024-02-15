import { UserModel } from "../../domain/models/userModel";
import { CreateUserModel } from "../../domain/useCases/createUser";

export interface CreateuserRepository {
  create(userdata: CreateUserModel): Promise<UserModel>;
}
