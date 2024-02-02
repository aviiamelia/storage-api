import { ZodError } from "zod";
import { MissingParamError } from "../error/missingParamsError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { ValuesValidator } from "../protocols/valuesValidator";
import { userSchema } from "../protocols/user.schema";
import { badRequest, ok } from "../helpers/https.helpers";
import { createUser } from "../../domain/useCases/createUser";

export class SignUpController {
  private readonly valuesValidator: ValuesValidator;
  private readonly createUser: createUser;
  constructor(ValuesValidator: ValuesValidator, createUser: createUser) {
    this.valuesValidator = ValuesValidator;
    this.createUser = createUser;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      userSchema.parse(httpRequest.body);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(new MissingParamError(error.issues));
      }
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
