import { prismaMock } from "../../infra/db/mock/singleton";
import { app } from "../config/app";
import { expect, test, describe, beforeAll, afterAll, beforeEach } from "vitest";
describe("user route", () => {
  beforeAll(async () => {
    await prismaMock.$connect();
  });
  afterAll(async () => {
    await prismaMock.$disconnect();
  });
  beforeEach(async () => {
    await prismaMock.file.deleteMany();
    await prismaMock.folder.deleteMany();
    await prismaMock.user.deleteMany();
  });
  test("create user route", async () => {
    const userData = {
      username: "validName",
      email: "valid@mail.com",
      password: "valid_password",
      isAdmin: false,
    };
    const request = await app.inject({
      method: "POST",
      url: "/user",
      body: userData,
    });
    expect(request.statusCode).toBe(201);
  });
});
