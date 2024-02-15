// const makeSut = () => {
//   const sut = new UserRepository();
//   return { sut };
// };
import prisma from "../../prismaClient/prsimaClient";
import { prismaMock } from "../../mock/singleton";

interface CreateUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({ data: user });
}

describe("should create new user", () => {
  beforeAll(async () => {});
  afterAll(() => {});

  test("should return a user on sucess", async () => {
    const user = {
      username: "test",
      email: "test@mail.com",
      password: "test",
      isAdmin: false,
      id: "test",
      createdAt: new Date("2024-02-15"),
      updatedAt: new Date("2024-02-15"),
    };
    prismaMock.user.create.mockResolvedValue(user);
    await expect(createUser(user)).resolves.toEqual({
      username: "test",
      email: "test@mail.com",
      password: "test",
      isAdmin: false,
      id: "test",
      createdAt: new Date("2024-02-15"),
      updatedAt: new Date("2024-02-15"),
    });
  });
});
