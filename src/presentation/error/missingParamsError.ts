import { ZodError, z } from "zod";

export class MissingParamError extends ZodError {
  constructor(issues: z.ZodIssue[]) {
    super(issues);
    this.name = "MissingParamError";
  }
}
