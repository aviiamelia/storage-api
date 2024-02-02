import { ZodError, ZodIssue } from "zod";
import { createUserController } from "./createUser";
import { UserTypeSchema } from "../../protocols/user.schema";
import { ValuesValidator } from "../../protocols/valuesValidator";
import { MissingParamError } from "../../error/missingParamsError";
import { UserModel } from "../../../domain/models/userModel";
import { createUser } from "../../../domain/useCases/createUser";

const makeCreateUser = (): createUser => {
  class createUserStub implements createUser {
    async create(): Promise<UserModel> {
      const fakeUser = {
        id: "fakeid",
        createdAt: new Date().toISOString().split("T")[0],
        email: "fakeEmail@mail.com",
        isAdmin: false,
        password: "fakePassword",
        upDatedAt: new Date().toISOString().split("T")[0],
        username: "fake username",
      };
      return fakeUser;
    }
  }
  return new createUserStub();
};
const userBodyValidatorStub = () => {
  class UserBodyValidatorStub implements ValuesValidator {
    isValid(
      values: UserTypeSchema
    ):
      | { success: true; data: UserTypeSchema }
      | { success: false; error: ZodError } {
      if (values) {
        return { success: true, data: values };
      }
      return { success: false, error: new ZodError([]) };
    }
  }
  return new UserBodyValidatorStub();
};
interface SutTypes {
  sut: createUserController;
  makeCreateUserStub: createUser;
  userBodyValidator: ValuesValidator;
}

const makeSut = (): SutTypes => {
  const makeCreateUserStub = makeCreateUser();
  const userBodyValidator = userBodyValidatorStub();
  const sut = new createUserController(userBodyValidator, makeCreateUserStub);
  return {
    sut,
    makeCreateUserStub,
    userBodyValidator,
  };
};

describe("creauserControler", () => {
  test("Should return 400 if no proper values are provided", async () => {
    jest.clearAllMocks();
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

    jest
      .spyOn(userBodyValidator, "isValid")
      .mockReturnValueOnce({
        success: false,
        error: new ZodError([errorMock] as ZodIssue[]),
      });
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(
      new MissingParamError([errorMock] as ZodIssue[])
    );
  });
  test("Should call values validator, with correct values", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "any name123",
        password: "any_password",
        email: "rafael@email.com",
        isAdmin: false,
      },
    };
    const spy = jest.spyOn(sut, "handle");
    await sut.handle(httpRequest);
    expect(spy).toHaveBeenCalledWith(httpRequest);
  });
  test("Should call create user, with correct values", async () => {
    const { sut, makeCreateUserStub } = makeSut();
    const httpRequest = {
      body: {
        username: "any name",
        password: "any_password",
        email: "rafael@email.com",
        isAdmin: false,
      },
    };
    const createSpy = jest.spyOn(makeCreateUserStub, "create");
    await sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body);
  });
  test("Should return 200 if the user is created", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "valid name",
        password: "valid password",
        email: "valid@email.com",
        isAdmin: true,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "fakeid",
      createdAt: new Date().toISOString().split("T")[0],
      email: "fakeEmail@mail.com",
      isAdmin: false,
      password: "fakePassword",
      upDatedAt: new Date().toISOString().split("T")[0],
      username: "fake username",
    });
  });
});
