import { UserModel } from "../models/userModel";

export interface CreateUserModel {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export interface createUser {
  create(user: CreateUserModel): Promise<UserModel>;
}
