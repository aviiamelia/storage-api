import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";
import { vi, describe, test, expect } from "vitest";

interface SutType {
  sut: BcryptAdapter;
}
const salt = 12;
const makeSut = (): SutType => {
  const sut = new BcryptAdapter(salt);
  return { sut };
};

describe("Bcrypt Adapter", () => {
  test("Should call bcrypt with correct values", async () => {
    const { sut } = makeSut();
    const hashSpy = vi.spyOn(bcrypt, "hash");
    await sut.encrypt("value");
    expect(hashSpy).toHaveBeenCalledWith("value", salt);
  });
  test("Should return a hashed on success", async () => {
    const { sut } = makeSut();
    const hash = await sut.encrypt("value");

    expect(hash).toBe(hash);
  });
  test("Should throw if bcrypt throws", async () => {
    const { sut } = makeSut();
    const expectedError = new Error("Encryption failed");
    vi.spyOn(bcrypt, "hash").mockRejectedValueOnce(expectedError as never);
    const hash = sut.encrypt("value");
    await expect(hash).rejects.toThrow();
  });
});
