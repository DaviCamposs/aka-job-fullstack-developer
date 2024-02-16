import { User } from "../../domain/entities";
import jwt from "jsonwebtoken";
import { AuthenticationServiceImpl } from "./authentication.service";

// Mock jwt.sign function
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("token"),
}));

describe("AuthenticationServiceImpl unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.JWT_SECRET; // Reset JWT_SECRET before each test

  });

  it("should return token when called", () => {
    // Arrange
    const sut = new AuthenticationServiceImpl();
    const user = new User("David", "david@mail.com", "password", 1);

    // Act
    const result = sut.generateToken(user);

    // Assert
    expect(result).toBe("token");

    // Behaviors
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        email: "david@mail.com",
        id: 1,
      },
      "secret",
      { expiresIn: "1h" }
    );
  });

});
