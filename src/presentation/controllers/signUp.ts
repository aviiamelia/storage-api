import { MissingParamError } from "../error/missingParamsError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { ValuesValidator } from "../protocols/valuesValidator";
import { badRequest, ok } from "../helpers/badrequest";
import { handleUserInterface } from "../../domain/useCases/user";

export class UserController {
  private readonly valuesValidator: ValuesValidator;
  private readonly createUser: handleUserInterface;
  constructor(ValuesValidator: ValuesValidator, createUser: handleUserInterface) {
    this.valuesValidator = ValuesValidator;
    this.createUser = createUser;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const isValid = this.valuesValidator.isValid(httpRequest.body);
    if (!isValid.success) {
      return badRequest(new MissingParamError(isValid.error.issues));
    }
    const { username, password, email, isAdmin } = httpRequest.body;
    await this.createUser.create({ username, password, email, isAdmin });
    return ok(201, httpRequest.body);
  }
}
