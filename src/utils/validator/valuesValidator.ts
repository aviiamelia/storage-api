import { UserTypeSchema } from "../../presentation/protocols/user.schema";
import { ValuesValidator } from "../../presentation/protocols/valuesValidator";
import { userSchema } from "../../presentation/protocols/user.schema";
import { ZodError } from "zod";

export class ValuesValidatorAdapter implements ValuesValidator {
  isValid(
    values: UserTypeSchema
  ):
    | { success: true; data: UserTypeSchema }
    | { success: false; error: ZodError } {
    const isValid = userSchema.safeParse(values);
    return isValid;
  }
}
