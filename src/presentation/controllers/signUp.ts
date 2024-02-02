import { ZodError } from "zod";
import { MissingParamError } from "../error/missingParamsError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { ValuesValidator } from "../protocols/valuesValidator";
import { userSchema } from "../protocols/user.schema";
import { badRequest } from "../helpers/badrequest";

export class SignUpController {
  private readonly valuesValidator: ValuesValidator;
  constructor(ValuesValidator: ValuesValidator) {
    this.valuesValidator = ValuesValidator;
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      userSchema.parse(httpRequest.body);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(new MissingParamError(error.issues));
      }
    }
    return {
      body: httpRequest.body,
      statusCode: 200,
    };
  }
}
