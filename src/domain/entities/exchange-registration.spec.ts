import { ExchangeRegistration } from "./exchange-registration";

describe("ExchangeRegistration unit test", () => {
  it("should create a exchangeRegistration with correct values", () => {
    // Act
    const exchangeRegistration = new ExchangeRegistration(
      "source",
      "destination",
      100,
      "date",
      1
    );

    // Assert
    expect(exchangeRegistration.id).toBe(1);
    expect(exchangeRegistration.code_source).toBe("source");
    expect(exchangeRegistration.code_destination).toBe("destination");
    expect(exchangeRegistration.value).toBe(100);
    expect(exchangeRegistration.date).toBe("date");
  });
});
