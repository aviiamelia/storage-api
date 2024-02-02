import { UserModel } from "../models/userModel";

export interface createUserModel {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export interface createUser {
  create(user: createUserModel): Promise<UserModel>;
}
