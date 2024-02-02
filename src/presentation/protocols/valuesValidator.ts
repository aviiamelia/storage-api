import { UserTypeSchema } from "./user.schema";

export interface ValuesValidator {
  isValid(values: UserTypeSchema): boolean;
}
