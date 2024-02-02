import { ZodIssue } from "zod";
import { SignUpController } from "./signUp";
import { UserTypeSchema } from "../protocols/user.schema";
import { ValuesValidator } from "../protocols/valuesValidator";

import { MissingParamError } from "../error/missingParamsError";

const makeSut = () => {
  class UserBodyValidatorStub implements ValuesValidator {
    isValid(values: UserTypeSchema) {
      if (values) {
        return true;
      }
      return false;
    }
  }
  return new SignUpController(new UserBodyValidatorStub());
};

describe("signUpController", () => {
  test("Should return 400 if no proper values are provided", () => {
    const sut = makeSut();

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
    const sut = makeSut();
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
});
