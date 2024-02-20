import { UserRepositoryInterface } from "../../../../data/protocols/createuserRepository";
import { UserModel } from "../../../../domain/models/userModel";
import { CreateUserModel } from "../../../../domain/useCases/createUser";
import prisma from "../../prismaClient/prismaClient";

export class UserRepository implements UserRepositoryInterface {
  async create(userData: CreateUserModel): Promise<UserModel> {
    const user = await prisma.user.create({ data: userData });

    return user;
  }
}
