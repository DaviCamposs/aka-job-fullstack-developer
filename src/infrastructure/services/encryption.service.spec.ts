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

  it("should compare value when called", () => {
    // Arrange
    const sut = new EncryptionServiceImpl();
    (
      bcrypt.compareSync as jest.MockedFunction<typeof bcrypt.compareSync>
    ).mockReturnValue(true);

    // Act
    const result = sut.compareValues("value", "encrypted");

    // Assert
    expect(result).toBeTruthy();
  });
});
