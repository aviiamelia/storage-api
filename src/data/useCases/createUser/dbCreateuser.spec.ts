import { DbCreateUser } from "./dbCreateUser";

describe("dbCreateUser", () => {
  test("Should call Encrypter with correct password", () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashedPassword"));
      }
    }

    const encryptStub = new EncrypterStub();
    const sut = new DbCreateUser(encryptStub);
    const encryptSpy = jest.spyOn(encryptStub, "encrypt");
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
