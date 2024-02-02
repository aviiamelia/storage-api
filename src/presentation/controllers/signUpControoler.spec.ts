import { ZodIssue } from "zod";
import { MissingParamError } from "../error/missingParamsError";
import { SignUpController } from "./signUp";
import { UserTypeSchema } from "../protocols/user.schema";
import { ValuesValidator } from "../protocols/valuesValidator";

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
});
