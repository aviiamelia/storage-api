import { UserModel } from "../models/userModel";

export interface CreateUserModel {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export interface handleUserInterface {
  create(user: CreateUserModel): Promise<UserModel>;
}
