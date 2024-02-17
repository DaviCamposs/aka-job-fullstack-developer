import { ExchangeRegistration } from "../../../domain/entities";
import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../domain/services";
import { IGenerateExchangeRegistrationHistoryUseCase } from "../../../domain/usecases";
import { GenerateExchangeRegistrationHistoryUseCaseImpl } from "./generate-exchange-registration-history.usecase";

interface SutTypes {
  exchangeRegistrationHistoryRepository: IExchangeRegistrationRepository;
  exchangeRegistrationService: IExchangeRegistrationService;
  sut: IGenerateExchangeRegistrationHistoryUseCase;
}

const makeSut = (): SutTypes => {
  const exchangeRegistrationHistoryRepository: IExchangeRegistrationRepository =
    {
      find: jest.fn(),
      save: jest.fn(),
    };

  const exchangeRegistrationService: IExchangeRegistrationService = {
    calculateStatisticsByDay: jest.fn(),
    calculateStatisticsByHour: jest.fn(),
    retrieveExchangeValues: jest.fn(),
  };

  const sut: IGenerateExchangeRegistrationHistoryUseCase =
    new GenerateExchangeRegistrationHistoryUseCaseImpl(
      exchangeRegistrationHistoryRepository,
      exchangeRegistrationService
    );

  return {
    exchangeRegistrationHistoryRepository,
    exchangeRegistrationService,
    sut,
  };
};

describe("GenerateExchangeRegistrationHistoryUseCaseImpl unit tests", () => {
  it("should calculate results with correct parameters when called", async () => {
    // Arrange
    const {
      exchangeRegistrationHistoryRepository,
      exchangeRegistrationService,
      sut,
    } = makeSut();

    const exchangeRegistrationHistoryRepositorySpy = jest
      .spyOn(exchangeRegistrationHistoryRepository, "find")
      .mockResolvedValue([
        new ExchangeRegistration("BRL-USD", "BRL", "USD", 10, "date 1"),
        new ExchangeRegistration("EUR-BRL", "EUR", "BRL", 30, "date 2"),
      ]);

    const calculateStatisticsByHour = jest
      .spyOn(exchangeRegistrationService, "calculateStatisticsByHour")
      .mockReturnValue([
        {
          hour: "hour 1",
          data: [],
        },
      ]);

    const calculateStatisticsByDaySpy = jest.spyOn(
      exchangeRegistrationService,
      "calculateStatisticsByDay"
    );

    // Act
    const result = (await sut.execute("BRL-USD", "09", "02", "2024")) as any;

    // Behaviors
    expect(exchangeRegistrationHistoryRepositorySpy).toHaveBeenCalledTimes(1);
    expect(exchangeRegistrationHistoryRepositorySpy).toHaveBeenCalledWith(
      "BRL-USD",
      "09",
      "02",
      "2024"
    );

    expect(calculateStatisticsByHour).toHaveBeenCalledTimes(1);
    expect(calculateStatisticsByHour).toHaveBeenCalledWith([
      new ExchangeRegistration("BRL-USD", "BRL", "USD", 10, "date 1"),
      new ExchangeRegistration("EUR-BRL", "EUR", "BRL", 30, "date 2"),
    ]);

    expect(calculateStatisticsByDaySpy).toHaveBeenCalledTimes(1);
    expect(calculateStatisticsByDaySpy).toHaveBeenCalledWith([
      {
        hour: "hour 1",
        data: [],
      },
    ]);
  });

  it("should return result grouped by hour when specify day", async () => {
    // Arrange
    const { exchangeRegistrationService, sut } = makeSut();

    jest
      .spyOn(exchangeRegistrationService, "calculateStatisticsByDay")
      .mockReturnValue([
        {
          day: "day 1",
          data: [],
        },
      ]);

    jest
      .spyOn(exchangeRegistrationService, "calculateStatisticsByHour")
      .mockReturnValue([
        {
          hour: "hour 1",
          data: [],
        },
      ]);

    // Act
    const result = (await sut.execute("BRL-USD", "09", "02", "2024")) as any;

    // Assert
    expect(result[0].hour).toBe("hour 1");
    expect(result[0].day).toBeUndefined();
  });

  it("should return result grouped by day when not specify day", async () => {
    // Arrange
    const { exchangeRegistrationService, sut } = makeSut();

    jest
      .spyOn(exchangeRegistrationService, "calculateStatisticsByDay")
      .mockReturnValue([
        {
          day: "day 1",
          data: [],
        },
      ]);

    jest
      .spyOn(exchangeRegistrationService, "calculateStatisticsByHour")
      .mockReturnValue([
        {
          hour: "hour 1",
          data: [],
        },
      ]);

    // Act
    const result = (await sut.execute(
      "BRL-USD",
      undefined,
      "02",
      "2024"
    )) as any;

    // Assert
    expect(result[0].day).toBe("day 1");
    expect(result[0].hour).toBeUndefined();
  });
});
