import { User } from "../../domain/entities";
import { DomainError, InvalidCredentialsError } from "../../domain/errors";
import { IUserRepository } from "../../domain/repositories";
import { IEncryptionService, IUserService } from "../../domain/services";
import { UserServiceImpl } from "./user.service";

interface SutTypes {
  encryptionService: IEncryptionService;
  userRepository: IUserRepository;
  sut: IUserService;
}

const makeSut = (): SutTypes => {
  const encryptionService: IEncryptionService = {
    encrypt: jest.fn(),
    compareValues: jest.fn(),
  };

  const userRepository: IUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
  };

  const sut: IUserService = new UserServiceImpl(
    encryptionService,
    userRepository
  );

  return {
    encryptionService,
    userRepository,
    sut,
  };
};

describe("UserService unit tests", () => {
  describe("createUser method", () => {
    it("should throw a DomainError when name is invalid", async () => {
      // Arrange
      const { sut } = makeSut();

      // Act and Assert
      await expect(() => sut.createUser("a", "david@mail.com", "12345678")).rejects.toThrow(
        new DomainError("The name of user must be at least 2 characters")
      );
    });

    it("should throw a DomainError when email is invalid", async () => {
      // Arrange
      const { sut } = makeSut();

      // Act and Assert
      await expect(() => sut.createUser("David", "david@", "12345678")).rejects.toThrow(
        new DomainError("The email of user must be valid")
      );
    });

    it("should throw a DomainError when password is invalid", async () => {
      // Arrange
      const { sut } = makeSut();

      // Act and Assert
      await expect(() =>
        sut.createUser("David", "david@mail.com", "1234567")
      ).rejects.toThrow(
        new DomainError("The password of user must be at least 8 characters")
      );
    });

    it("should throw a DomainError when email is already registered", async () => {
      // Arrange
      const { sut , userRepository} = makeSut();
      const registeredUser = new User('David','david@mail.com','password')
      const userRepositorySpy = jest.spyOn(userRepository,'findByEmail').mockResolvedValue(registeredUser)

      // Act and Assert
      await expect(() =>
        sut.createUser("David", "david@mail.com", "12345678")
      ).rejects.toThrow(
        new DomainError("The email is already registered")
      );

      // Behaviors
      expect(userRepositorySpy).toHaveBeenCalledTimes(1)
      expect(userRepositorySpy).toHaveBeenCalledWith('david@mail.com')

    });

    it("should create an user with encrypted password when called", async () => {
      // Arrange
      const { sut, encryptionService } = makeSut();
      const encryptionServiceSpy = jest
        .spyOn(encryptionService, "encrypt")
        .mockReturnValue("encryptedPassword");

      // Act
      const result = await sut.createUser("David", "david@mail.com", "12345678");

      // Assert
      expect(result.name).toBe("David");
      expect(result.email).toBe("david@mail.com");
      expect(result.password).toBe("encryptedPassword");

      // Behaviors
      expect(encryptionServiceSpy).toHaveBeenCalledTimes(1);
      expect(encryptionServiceSpy).toHaveBeenCalledWith("12345678");
    });
  });
  describe("authenticate method", () => {
    it("should throw an invalidCredentialsError when credentials are invalid", () => {
      // Arrange
      const { sut, encryptionService } = makeSut();
      const encryptionServiceSpy = jest
        .spyOn(encryptionService, "compareValues")
        .mockReturnValue(false);
      const user = new User("David", "email", "password");

      // Act and Assert
      expect(() => sut.authenticate(user, "12345678")).toThrow(
        new InvalidCredentialsError("Invalid Credentials")
      );

      // Behaviors
      expect(encryptionServiceSpy).toHaveBeenCalledTimes(1);
      expect(encryptionServiceSpy).toHaveBeenCalledWith("password", "12345678");
    });

    it("should throw an invalidCredentialsError when credentials are invalid", () => {
      // Arrange
      const { sut, encryptionService } = makeSut();
      const encryptionServiceSpy = jest
        .spyOn(encryptionService, "compareValues")
        .mockReturnValue(false);
      const user = new User("David", "email", "password");

      // Act and Assert
      expect(() => sut.authenticate(user, "12345678")).toThrow(
        new InvalidCredentialsError("Invalid Credentials")
      );

      // Behaviors
      expect(encryptionServiceSpy).toHaveBeenCalledTimes(1);
      expect(encryptionServiceSpy).toHaveBeenCalledWith("password", "12345678");
    });

    it("should not throw any error when credentials are valid", () => {
      // Arrange
      const { sut, encryptionService } = makeSut();
      const encryptionServiceSpy = jest
        .spyOn(encryptionService, "compareValues")
        .mockReturnValue(true);
      const user = new User("David", "email", "password");

      // Act and Assert
      expect(() => sut.authenticate(user, "12345678")).not.toThrow();

      // Behaviors
      expect(encryptionServiceSpy).toHaveBeenCalledTimes(1);
      expect(encryptionServiceSpy).toHaveBeenCalledWith("password", "12345678");
    });
  });
});
