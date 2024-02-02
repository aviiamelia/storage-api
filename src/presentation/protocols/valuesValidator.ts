import { ZodError } from "zod";
import { UserTypeSchema } from "./user.schema";

export interface ValuesValidator {
  isValid(
    values: unknown
  ):
    | { success: true; data: UserTypeSchema }
    | { success: false; error: ZodError };
}
