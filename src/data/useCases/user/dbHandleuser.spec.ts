import { UserModel } from "../../../domain/models/userModel";
import { CreateUserModel } from "../../../domain/useCases/createUser";
import { UserRepositoryInterface } from "../../protocols/createuserRepository";
import { Encrypter } from "../../protocols/encrypter";
import { DbHandleUser } from "./dbHandleUser";

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value = "hashed_password"): Promise<string> {
      return new Promise((resolve) => resolve(value));
    }
  }
  return new EncrypterStub();
};
const makeCreateuserRepository = (): UserRepositoryInterface => {
  class CreateuserRepositoryStub implements UserRepositoryInterface {
    async create(user: CreateUserModel): Promise<UserModel> {
      const data = {
        ...user,
        id: "1",
        createdAt: new Date("2024-02-15T04:56:04.929Z"),
        updatedAt: new Date("2024-02-15T04:56:04.929Z"),
      };
      return new Promise((resolve) => resolve(data));
    }
  }
  return new CreateuserRepositoryStub();
};

interface SutType {
  sut: DbHandleUser;
  encrypterStub: Encrypter;
  createuserRepositoryStub: UserRepositoryInterface;
}
const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter();
  const createuserRepositoryStub = makeCreateuserRepository();
  const sut = new DbHandleUser(encrypterStub, createuserRepositoryStub);
  return { sut, encrypterStub, createuserRepositoryStub };
};

describe("dbCreateUser", () => {
  test("Should call Encrypter with correct password", () => {
    const { encrypterStub, sut } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const userData = {
      username: "validName",
      email: "valid@mail.com",
      password: "valid_password",
      isAdmin: false,
    };
    sut.create(userData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
  test("Should throw if encrypter throws", async () => {
    const { encrypterStub, sut } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const userData = {
      username: "validName",
      email: "valid@mail.com",
      password: "valid_password",
      isAdmin: false,
    };
    const promise = sut.create(userData);
    await expect(promise).rejects.toThrow();
  });
  test("Should call createuser repository with correct values", async () => {
    const { createuserRepositoryStub, sut } = makeSut();
    const createSpy = jest.spyOn(createuserRepositoryStub, "create");
    const userData = {
      username: "validName",
      email: "valid@mail.com",
      password: "hashed_password",
      isAdmin: false,
    };
    await sut.create(userData);
    expect(createSpy).toHaveBeenCalledWith(userData);
  });
  test("Should throw if createuserRepository throws", async () => {
    const { createuserRepositoryStub, sut } = makeSut();
    jest
      .spyOn(createuserRepositoryStub, "create")
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const userData = {
      username: "validName",
      email: "valid@mail.com",
      password: "valid_password",
      isAdmin: false,
    };
    const promise = sut.create(userData);
    await expect(promise).rejects.toThrow();
  });
  test("Should return an user on sucess", async () => {
    const { sut } = makeSut();
    const userData = {
      username: "validName",
      email: "valid@mail.com",
      password: "hashed_password",
      isAdmin: false,
    };
    const user = await sut.create(userData);
    expect(user).toEqual({
      ...userData,
      id: "1",
      createdAt: new Date("2024-02-15T04:56:04.929Z"),
      updatedAt: new Date("2024-02-15T04:56:04.929Z"),
    });
  });
});
