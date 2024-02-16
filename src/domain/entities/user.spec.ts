import { User } from "./user";

describe("user unit tests", () => {
  it("should create an user with correct fields", () => {
    // Act
    const user = new User("David", "david@mail.com", "12345678");

    // Assert
    expect(user.id).toBeUndefined()
    expect(user.name).toBe("David");
    expect(user.email).toBe("david@mail.com");
    expect(user.password).toBe("12345678");

  });
});
