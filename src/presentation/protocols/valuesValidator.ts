import { ZodError } from "zod";
import { UserTypeSchema } from "./user.schema";

export interface ValuesSucess {
  success: true;
  data: UserTypeSchema;
}
export interface ValuesFailed {
  success: false;
  error: ZodError;
}

export interface ValuesValidator {
  isValid(values: unknown): ValuesSucess | ValuesFailed;
}
