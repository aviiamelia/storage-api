import { MissingParamError } from "../../error/missingParamsError";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ValuesValidator } from "../../protocols/valuesValidator";
import { badRequest, ok } from "../../helpers/https.helpers";
import { createUser } from "../../../domain/useCases/createUser";

export class createUserController {
  private readonly valuesValidator: ValuesValidator;
  private readonly createUser: createUser;
  constructor(ValuesValidator: ValuesValidator, createUser: createUser) {
    this.valuesValidator = ValuesValidator;
    this.createUser = createUser;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const isValid = this.valuesValidator.isValid(httpRequest.body);
    if (!isValid.success) {
      return badRequest(new MissingParamError(isValid.error.issues));
    }
    const { username, password, email, isAdmin } = httpRequest.body;
    const user = await this.createUser.create({
      username,
      password,
      email,
      isAdmin,
    });
    return ok(200, user);
  }
}
