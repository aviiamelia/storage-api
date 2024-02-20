import { userSchema } from "../presentation/protocols/user.schema";
import {
  ValuesFailed,
  ValuesSucess,
  ValuesValidator,
} from "../presentation/protocols/valuesValidator";

export class ValuesValidatorAdapter implements ValuesValidator {
  isValid(values: unknown): ValuesSucess | ValuesFailed {
    const verify = userSchema.safeParse(values);
    return verify;
  }
}
