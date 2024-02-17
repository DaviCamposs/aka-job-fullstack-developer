import { ExchangeRegistrationCache } from "../../../domain/entities";
import { IExchangeRegistrationCacheRepository } from "../../../domain/repositories";
import { IExchangeRegistrationCacheService } from "../../../domain/services";
import { IStoreExchangeRegistrationDayHistoryUseCase, IStoreExchangeRegistrationHourHistoryUseCase } from "../../../domain/usecases";
import { StoreExchangeRegistrationDayHistoryUseCaseImpl } from "./store-exchange-registration-day-history.usecase";
import { StoreExchangeRegistrationHourHistoryUseCaseImpl } from "./store-exchange-registration-hour-history.usecase";

interface SutTypes {
  exchangeRegistrationCacheService: IExchangeRegistrationCacheService;
  exchangeRegistrationCacheRepository: IExchangeRegistrationCacheRepository;
  sut: IStoreExchangeRegistrationHourHistoryUseCase;
}

const makeSut = (): SutTypes => {
  const exchangeRegistrationCacheService: IExchangeRegistrationCacheService = {
    convertExchangeRegistrationToDayCache: jest.fn(),
    convertExchangeRegistrationToHourCache: jest.fn(),
  };

  const exchangeRegistrationCacheRepository: IExchangeRegistrationCacheRepository =
    {
      save: jest.fn(),
    };

  const sut: IStoreExchangeRegistrationHourHistoryUseCase =
    new StoreExchangeRegistrationHourHistoryUseCaseImpl(
      exchangeRegistrationCacheService,
      exchangeRegistrationCacheRepository
    );

  return {
    exchangeRegistrationCacheService,
    exchangeRegistrationCacheRepository,
    sut,
  };
};

describe("StoreExchangeRegistrationHourHistoryUseCaseImpl unit tests", () => {
  it("should save formatted data to database", async () => {
    // Arrange
    const {
      exchangeRegistrationCacheRepository,
      exchangeRegistrationCacheService,
      sut,
    } = makeSut();

    const convertExchangeRegistrationToHourCacheSpy = jest
      .spyOn(
        exchangeRegistrationCacheService,
        "convertExchangeRegistrationToHourCache"
      )
      .mockReturnValue([
        new ExchangeRegistrationCache(
          "source",
          "destination",
          "BRL-USD",
          100,
          0,
          50,
          "09",
          "02",
          "2024",
          "date",
          "hour"
        ),
      ]);
    const exchangeRegistrationCacheRepositorySpy = jest.spyOn(
      exchangeRegistrationCacheRepository,
      "save"
    );

    // Act
    await sut.execute([
      {
        hour: "hour 1",
        data: [],
      },
    ]);

    // Behaviors
    expect(convertExchangeRegistrationToHourCacheSpy).toHaveBeenCalledTimes(1);
    expect(convertExchangeRegistrationToHourCacheSpy).toHaveBeenCalledWith([
      {
        hour: "hour 1",
        data: [],
      },
    ]);

    expect(exchangeRegistrationCacheRepositorySpy).toHaveBeenCalledTimes(1);
    expect(exchangeRegistrationCacheRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining([
        {
          _acronym: "BRL-USD",
          _avg: 50,
          _code_destination: "destination",
          _code_source: "source",
          _date: "date",
          _day: "09",
          _max: 100,
          _min: 0,
          _month: "02",
          _type_register: "hour",
          _year: "2024",
        },
      ])
    );
  });
});
