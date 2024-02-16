import { DomainError } from "../../domain/errors";
import { IEncryptionService, IUserService } from "../../domain/services";
import { UserServiceImpl } from "./user.service";

interface SutTypes {
  encryptionService: IEncryptionService;
  sut: IUserService;
}

const makeSut = (): SutTypes => {
  const encryptionService: IEncryptionService = {
    encrypt: jest.fn(),
  };

  const sut: IUserService = new UserServiceImpl(encryptionService);

  return {
    encryptionService,
    sut,
  };
};

describe("UserService unit tests", () => {
  it("should throw a DomainError when name is invalid", () => {
    // Arrange
    const { sut } = makeSut();

    // Act and Assert
    expect(() => sut.createUser("a", "david@mail.com", "12345678")).toThrow(
      new DomainError("The name of user must be at least 2 characters")
    );
  });

  it("should throw a DomainError when email is invalid", () => {
    // Arrange
    const { sut } = makeSut();

    // Act and Assert
    expect(() => sut.createUser("David", "david@", "12345678")).toThrow(
      new DomainError("The email of user must be valid")
    );
  });

  it("should throw a DomainError when password is invalid", () => {
    // Arrange
    const { sut } = makeSut();

    // Act and Assert
    expect(() => sut.createUser("David", "david@mail.com", "1234567")).toThrow(
      new DomainError("The password of user must be at least 8 characters")
    );
  });

  it("should create an user with encrypted password when called", () => {
    // Arrange
    const { sut, encryptionService } = makeSut();
    const encryptionServiceSpy = jest
      .spyOn(encryptionService, "encrypt")
      .mockReturnValue("encryptedPassword");

    // Act
    const result = sut.createUser("David", "david@mail.com", "12345678");

    // Assert
    expect(result.name).toBe("David");
    expect(result.email).toBe("david@mail.com");
    expect(result.password).toBe("encryptedPassword");

    // Behaviors
    expect(encryptionServiceSpy).toHaveBeenCalledTimes(1);
    expect(encryptionServiceSpy).toHaveBeenCalledWith("12345678");
  });
});
