import { SignUpController } from "./signUp";

describe("signUpController", () => {
  test("Should return 400 if no username is Provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        username: "any name",
        email: "any@mail.com",
        password: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
