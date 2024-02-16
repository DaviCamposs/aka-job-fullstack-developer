import bcrypt from "bcryptjs";
import { EncryptionServiceImpl } from "./encryption.service";

jest.mock("bcryptjs");

describe("EncryptionServiceImpl unit tests", () => {
  it("should hash value when called", () => {
    // Arrange
    const sut = new EncryptionServiceImpl();
    (
      bcrypt.hashSync as jest.MockedFunction<typeof bcrypt.hashSync>
    ).mockReturnValue("hashedValue");

    // Act
    const result = sut.encrypt("value");

    // Assert
    expect(result).toBe("hashedValue");
  });
});
