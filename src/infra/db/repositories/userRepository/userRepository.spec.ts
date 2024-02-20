import { prismaMock } from "../../mock/singleton";
import { UserRepository } from "./userRepository";

interface SutType {
  userRepository: UserRepository;
}

const makeSut = (): SutType => {
  const userRepository = new UserRepository();
  return { userRepository };
};

describe("should create new user", () => {
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
    const { userRepository } = makeSut();
    prismaMock.user.create.mockResolvedValue(user);
    const createdUser = userRepository.create(user);
    await expect(createdUser).resolves.toEqual({
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
