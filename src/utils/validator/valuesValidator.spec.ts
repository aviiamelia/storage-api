import { UserTypeSchema } from "../../presentation/protocols/user.schema";
import { ValuesValidatorAdapter } from "./valuesValidator";

describe("Values validator adapter", () => {
  test("Should return false if validator returns false", () => {
    const sut = new ValuesValidatorAdapter();
    const user = {
      username: "any",
      email: "any@mail.com",
      password: "anypassowrd",
    };
    const isValid = sut.isValid(user as UserTypeSchema);
    expect(isValid.success).toBe(false);
  });
});
