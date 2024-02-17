import { OperationalError } from "../../domain/errors";
import { IHttpClientProvider } from "../../domain/providers";
import { IExchangeRegistrationService } from "../../domain/services";
import { ExchangeRegistrationServiceImpl } from "./exchange-registration.service";

interface SutTypes {
  httpClient: IHttpClientProvider;
  sut: IExchangeRegistrationService;
}

const makeSut = (): SutTypes => {
  const httpClient: IHttpClientProvider = {
    fetch: jest.fn(),
  };

  const sut: IExchangeRegistrationService = new ExchangeRegistrationServiceImpl(
    httpClient
  );

  return {
    httpClient,
    sut,
  };
};

describe("ExchangeRegistrationServiceImpl unit tests", () => {
  it("should throw an OperationError when API returns error", async () => {
    // Arrange
    const { sut, httpClient } = makeSut();

    jest.spyOn(httpClient, "fetch").mockResolvedValue({
      data: {},
      headers: {},
      status: 500,
    });

    // Act and Assert
    await expect(() => sut.retrieveExchangeValues(["USD-BRL"])).rejects.toThrow(
      new OperationalError("It was not possible to retrieve exchange values")
    );
  });

  it("should return correct result when called", async () => {
    // Arrange
    const { sut, httpClient } = makeSut();

    const httpClientSpy = jest.spyOn(httpClient, "fetch").mockResolvedValue({
      data: {
        "USD-BRL": {
            code: 'USD',
            codein: 'BRL',
            bid: '4.50'
        },
        "EUR-BTC": {
            code: 'EUR',
            codein: 'BTC',
            bid: '0.004'
        }
      },
      headers: {},
      status: 200,
    });

    // Act
    const result = await sut.retrieveExchangeValues(['USD-BRL','EUR-BTC'])

    // Assert
    expect(result[0].code_source).toBe('USD')
    expect(result[0].code_destination).toBe('BRL')
    expect(result[0].value).toBe(4.50)

    expect(result[1].code_source).toBe('EUR')
    expect(result[1].code_destination).toBe('BTC')
    expect(result[1].value).toBe(0.004)

    // Behaviors
    expect(httpClientSpy).toHaveBeenCalledTimes(1)
    expect(httpClientSpy).toHaveBeenCalledWith(
        expect.objectContaining({
            url: "https://economia.awesomeapi.com.br/last/" + ['USD-BRL,EUR-BTC']
        })
    )

  });
});
