import { Encrypter } from "../../protocols/encrypter";
import { DbCreateUser } from "./dbCreateUser";

interface SutType {
  sut: DbCreateUser;
  encrypterStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve(value));
    }
  }
  return new EncrypterStub();
};
const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter();
  const sut = new DbCreateUser(encrypterStub);
  return { sut, encrypterStub };
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
});
