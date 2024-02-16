import { User } from "../../../domain/entities";
import { InvalidCredentialsError } from "../../../domain/errors";
import { IUserRepository } from "../../../domain/repositories";
import { IAuthenticationService, IUserService } from "../../../domain/services";
import { IAuthenticateUserUseCase } from "../../../domain/usecases";
import { AuthenticationServiceImpl } from "../../../infrastructure/services";
import { AuthenticateUserUseCaseImpl } from "./authenticate-user.usecase";

interface SutTypes {
  userRepository: IUserRepository;
  userService: IUserService;
  authenticationService: IAuthenticationService;
  sut: IAuthenticateUserUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository: IUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
  };

  const userService: IUserService = {
    authenticate: jest.fn(),
    createUser: jest.fn(),
  };

  const authenticationService: IAuthenticationService = {
    generateToken: jest.fn(),
  };

  const sut: IAuthenticateUserUseCase = new AuthenticateUserUseCaseImpl(
    userRepository,
    userService,
    authenticationService
  );

  return {
    userRepository,
    userService,
    authenticationService,
    sut,
  };
};

describe("AuthenticateUserUseCaseImpl", () => {
  it("should throw an InvalidCredentialError when there is no user associated to email", async () => {
    // Arrange
    const { sut, userRepository } = makeSut();

    const userRepositorySpy = jest
      .spyOn(userRepository, "findByEmail")
      .mockResolvedValue(null);

    // Act
    await expect(() =>
      sut.execute("david@mail.com", "password")
    ).rejects.toThrow(new InvalidCredentialsError("Invalid Credentials"));

    // Behaviors
    expect(userRepositorySpy).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy).toHaveBeenCalledWith("david@mail.com");
  });

  it("should throw an Error when authentication method fails", async () => {
    // Arrange
    const { sut, userRepository, userService } = makeSut();

    const user = new User("David", "david@mail.com", "12345678");

    const userRepositorySpy = jest
      .spyOn(userRepository, "findByEmail")
      .mockResolvedValue(user);
    const userServiceSpy = jest
      .spyOn(userService, "authenticate")
      .mockImplementation(() => {
        throw new Error("some message");
      });

    // Act
    await expect(() =>
      sut.execute("david@mail.com", "password")
    ).rejects.toThrow(new Error("some message"));

    // Behaviors
    expect(userRepositorySpy).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy).toHaveBeenCalledWith("david@mail.com");

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toHaveBeenCalledWith(user, "password");
  });

  it("should return userToken when called", async () => {
    // Arrange
    const { sut, userRepository, userService , authenticationService} = makeSut();

    const user = new User("David", "david@mail.com", "12345678",1);

    const userRepositorySpy = jest
      .spyOn(userRepository, "findByEmail")
      .mockResolvedValue(user);
    const userServiceSpy = jest
      .spyOn(userService, "authenticate")
      .mockImplementation(() => {});
    const authenticateServiceSpy = jest.spyOn(authenticationService,'generateToken').mockReturnValue('token')

    // Act
    const result = await sut.execute('david@mail.com','password')


    // Assert
    expect(result.id).toBe(1)
    expect(result.name).toBe('David')
    expect(result.email).toBe('david@mail.com')
    expect(result.token).toBe('token')

    // Behaviors
    expect(userRepositorySpy).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy).toHaveBeenCalledWith("david@mail.com");

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toHaveBeenCalledWith(user, "password");

    expect(authenticateServiceSpy).toHaveBeenCalledTimes(1)
    expect(authenticateServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
            _id: 1,
            _name: 'David',
            _email: 'david@mail.com'
        })
    )
  });
});
