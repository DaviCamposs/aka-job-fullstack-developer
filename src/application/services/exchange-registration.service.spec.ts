import { ExchangeRegistration } from "../../domain/entities";
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
  describe("retrieveExchangeValues", () => {
    it("should throw an OperationError when API returns error", async () => {
      // Arrange
      const { sut, httpClient } = makeSut();

      jest.spyOn(httpClient, "fetch").mockResolvedValue({
        data: {},
        headers: {},
        status: 500,
      });

      // Act and Assert
      await expect(() =>
        sut.retrieveExchangeValues(["USD-BRL"])
      ).rejects.toThrow(
        new OperationalError("It was not possible to retrieve exchange values")
      );
    });

    it("should return correct result when called", async () => {
      // Arrange
      const { sut, httpClient } = makeSut();

      const httpClientSpy = jest.spyOn(httpClient, "fetch").mockResolvedValue({
        data: {
          "USD-BRL": {
            code: "USD",
            codein: "BRL",
            bid: "4.50",
          },
          "EUR-BTC": {
            code: "EUR",
            codein: "BTC",
            bid: "0.004",
          },
        },
        headers: {},
        status: 200,
      });

      // Act
      const result = await sut.retrieveExchangeValues(["USD-BRL", "EUR-BTC"]);

      // Assert
      expect(result[0].code_source).toBe("USD");
      expect(result[0].code_destination).toBe("BRL");
      expect(result[0].value).toBe(4.5);

      expect(result[1].code_source).toBe("EUR");
      expect(result[1].code_destination).toBe("BTC");
      expect(result[1].value).toBe(0.004);

      // Behaviors
      expect(httpClientSpy).toHaveBeenCalledTimes(1);
      expect(httpClientSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "https://economia.awesomeapi.com.br/last/" + ["USD-BRL,EUR-BTC"],
        })
      );
    });
  });

  describe("calculateStatisticsByHour", () => {
    it("should return empty array when there is no input", () => {
      // Arrange
      const { sut } = makeSut();

      // Act
      const result = sut.calculateStatisticsByHour([]);

      // Assert
      expect(result).toHaveLength(0);
    });

    it("should return correct result when called - Items with same acronym in a hour", () => {
      // Arrange
      const { sut } = makeSut();

      const input = [
        new ExchangeRegistration(
          "USD-BRL",
          "USD",
          "BRL",
          20,
          "2024-02-17T16:05:00.511Z"
        ),
        new ExchangeRegistration(
          "USD-EUR",
          "USD",
          "EUR",
          1,
          "2024-02-17T16:05:00.511Z"
        ),
        new ExchangeRegistration(
          "USD-BRL",
          "USD",
          "BRL",
          90,
          "2024-02-17T16:25:00.511Z"
        ),
        new ExchangeRegistration(
          "BRL-EUR",
          "BRL",
          "EUR",
          40,
          "2024-02-18T07:55:00.511Z"
        ),
      ];

      // Act
      const result = sut.calculateStatisticsByHour(input);

      // Assert
      expect(result).toStrictEqual([
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 55,
              max: 90,
              min: 20,
            },
            {
              acronym: "USD-EUR",
              average: 1,
              max: 1,
              min: 1,
            },
          ],
          hour: "2024-02-17-16",
        },
        {
          data: [
            {
              acronym: "BRL-EUR",
              average: 40,
              max: 40,
              min: 40,
            },
          ],
          hour: "2024-02-18-7",
        },
      ]);
    });
  });

  describe("CalculateStatisticsByDat", () => {
    it("should return empty array when there is no input", () => {
      // Arrange
      const { sut } = makeSut();

      // Act
      const result = sut.calculateStatisticsByDay([]);

      // Assert
      expect(result).toHaveLength(0);
    });

    it("should return correct result when called - Items with same acronym in same day", () => {
      // Arrange
      const { sut } = makeSut();

      const input = [
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 55,
              max: 90,
              min: 20,
            },
            {
              acronym: "USD-EUR",
              average: 100,
              max: 50,
              min: 10,
            },
          ],
          hour: "2024-02-17-16",
        },
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 45,
              max: 80,
              min: 25,
            },
          ],
          hour: "2024-02-17-19",
        },
        {
          data: [
            {
              acronym: "BRL-EUR",
              average: 40,
              max: 40,
              min: 40,
            },
          ],
          hour: "2024-02-18-7",
        },
      ];

      // Act
      const result = sut.calculateStatisticsByDay(input);

      // Assert
      expect(result).toStrictEqual([
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 50,
              max: 90,
              min: 20,
            },
            {
              acronym: "USD-EUR",
              average: 100,
              max: 50,
              min: 10,
            },
          ],
          day: "2024-02-17",
        },
        {
          data: [
            {
              acronym: "BRL-EUR",
              average: 40,
              max: 40,
              min: 40,
            },
          ],
          day: "2024-02-18",
        },
      ]);
    });

    it("should return correct result when called - Items with same acronym in different days", () => {
      // Arrange
      const { sut } = makeSut();

      const input = [
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 55,
              max: 90,
              min: 20,
            },
            {
              acronym: "USD-EUR",
              average: 100,
              max: 50,
              min: 10,
            },
          ],
          hour: "2024-02-17-16",
        },
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 45,
              max: 80,
              min: 25,
            },
          ],
          hour: "2024-02-17-19",
        },
        {
          data: [
            {
              acronym: "BRL-EUR",
              average: 40,
              max: 40,
              min: 40,
            },
          ],
          hour: "2024-02-18-7",
        },
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 30,
              max: 50,
              min: 30,
            },
          ],
          hour: "2024-02-27-7",
        },
      ];

      // Act
      const result = sut.calculateStatisticsByDay(input);

      // Assert
      expect(result).toStrictEqual([
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 50,
              max: 90,
              min: 20,
            },
            {
              acronym: "USD-EUR",
              average: 100,
              max: 50,
              min: 10,
            },
          ],
          day: "2024-02-17",
        },
        {
          data: [
            {
              acronym: "BRL-EUR",
              average: 40,
              max: 40,
              min: 40,
            },
          ],
          day: "2024-02-18",
        },
        {
          data: [
            {
              acronym: "USD-BRL",
              average: 30,
              max: 50,
              min: 30,
            },
          ],
          day: "2024-02-27",
        },
      ]);
    });
  });
});
