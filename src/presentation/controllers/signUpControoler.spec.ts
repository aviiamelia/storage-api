import { ZodIssue } from "zod";
import { SignUpController } from "./signUp";
import { UserTypeSchema } from "../protocols/user.schema";
import { ValuesValidator } from "../protocols/valuesValidator";
import { MissingParamError } from "../error/missingParamsError";
import { UserModel } from "../../domain/models/userModel";
import { createUser } from "../../domain/useCases/createUser";

const makeCreateUser = (): createUser => {
  class createUserStub implements createUser {
    create(): UserModel {
      const fakeUser = {
        id: "fakeid",
        createdAt: new Date(),
        email: "fakeEmail",
        isAdmin: false,
        password: "fakePassword",
        upDatedAt: new Date(),
        username: "fake username",
      };
      return fakeUser;
    }
  }
  return new createUserStub();
};
interface SutTypes {
  sut: SignUpController;
  makeCreateUserStub: createUser;
}

const makeSut = (): SutTypes => {
  class UserBodyValidatorStub implements ValuesValidator {
    isValid(values: UserTypeSchema) {
      if (values) {
        return true;
      }
      return false;
    }
  }
  const makeCreateUserStub = makeCreateUser();
  const sut = new SignUpController(
    new UserBodyValidatorStub(),
    makeCreateUserStub
  );
  return {
    sut,
    makeCreateUserStub,
  };
};

describe("signUpController", () => {
  test("Should return 400 if no proper values are provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        username: "any name",
        password: "any_password",
        email: "rafael@email.com",
      },
    };
    const errorMock = [
      {
        code: "invalid_type",
        expected: "boolean",
        received: "undefined",
        path: ["isAdmin"],
        message: "Required",
      },
    ];
    const httpResponse = sut.handle(httpRequest);
    console.log(httpResponse.body.issues);
    expect(httpResponse.body).toEqual(
      new MissingParamError(errorMock as ZodIssue[])
    );
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
    sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
