import { ZodError, ZodIssue } from "zod";
import { SignUpController } from "./signUp";
import { UserTypeSchema } from "../protocols/user.schema";
import { ValuesValidator } from "../protocols/valuesValidator";
import { MissingParamError } from "../error/missingParamsError";
import { UserModel } from "../../domain/models/userModel";
import { handleUserInterface } from "../../domain/useCases/user";

const makeCreateUser = (): handleUserInterface => {
  class handleUserStub implements handleUserInterface {
    async create(): Promise<UserModel> {
      const fakeUser = {
        id: "fakeid",
        createdAt: new Date(),
        email: "fakeEmail",
        isAdmin: false,
        password: "fakePassword",
        updatedAt: new Date(),
        username: "fake username",
      };
      return new Promise((resolve) => resolve(fakeUser));
    }
  }
  return new handleUserStub();
};

const userBodyValidatorStub = () => {
  class UserBodyValidatorStub implements ValuesValidator {
    isValid(
      values: UserTypeSchema
    ): { success: true; data: UserTypeSchema } | { success: false; error: ZodError } {
      if (values) {
        return { success: true, data: values };
      }
      return { success: false, error: new ZodError([]) };
    }
  }
  return new UserBodyValidatorStub();
};
interface SutTypes {
  sut: SignUpController;
  makeHandleUserStub: handleUserInterface;
  userBodyValidator: ValuesValidator;
}
const makeSut = (): SutTypes => {
  const makeHandleUserStub = makeCreateUser();
  const userBodyValidator = userBodyValidatorStub();
  const sut = new SignUpController(userBodyValidator, makeHandleUserStub);
  return {
    sut,
    makeHandleUserStub,
    userBodyValidator,
  };
};

describe("signUpController", () => {
  jest.clearAllMocks();
  test("Should return 400 if no proper values are provided", async () => {
    const { sut, userBodyValidator } = makeSut();
    const httpRequest = {
      body: {
        username: "any name",
        password: "any_password",
        email: "rafael@email123.com",
      },
    };
    const errorMock = {
      code: "invalid_type",
      expected: "boolean",
      received: "undefined",
      path: ["isAdmin"],
      message: "Required",
    };

    jest.spyOn(userBodyValidator, "isValid").mockReturnValueOnce({
      success: false,
      error: new ZodError([errorMock] as ZodIssue[]),
    });
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError([errorMock] as ZodIssue[]));
  });
  test("Should call values validator, with correct values", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "any name",
        password: "any_password",
        email: "rafael@email.com",
        isAdmin: false,
      },
    };
    const spy = jest.spyOn(sut, "handle");
    sut.handle(httpRequest);
    expect(spy).toHaveBeenCalledWith(httpRequest);
  });
  test("Should call create user, with correct values", () => {
    const { sut, makeHandleUserStub } = makeSut();
    const httpRequest = {
      body: {
        username: "any name",
        password: "any_password",
        email: "rafael@email.com",
        isAdmin: false,
      },
    };
    const createSpy = jest.spyOn(makeHandleUserStub, "create");
    sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
