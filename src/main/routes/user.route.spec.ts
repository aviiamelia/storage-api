import { prismaMock } from "../../infra/db/mock/singleton";
import { app } from "../config/app";

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
    const request = await app.inject({
      method: "GET",
      url: "/user",
    });
    const response = JSON.parse(request.payload);

    expect(response).toEqual({ message: "deu certo" });
  });
});
