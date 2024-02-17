import { ISaveExchangeRegistrationUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { FetchExchangeDataFromAPIController } from "./fetch-exchange-data-from-api.controller";

interface sutTypes {
  saveExchangeRegistrationUseCase: ISaveExchangeRegistrationUseCase;
  sut: Controller;
}

const makeSut = (): sutTypes => {
  const saveExchangeRegistrationUseCase: ISaveExchangeRegistrationUseCase = {
    execute: jest.fn(),
  };
  const sut: Controller = new FetchExchangeDataFromAPIController(
    saveExchangeRegistrationUseCase
  );

  return {
    saveExchangeRegistrationUseCase,
    sut,
  };
};

describe("FetchExchangeDataFromAPIController unit tests", () => {
  it("should return all correct when called", async () => {
    // Arrange
    const { sut, saveExchangeRegistrationUseCase } = makeSut();

    const saveExchangeRegistrationUseCaseSpy = jest.spyOn(
      saveExchangeRegistrationUseCase,
      "execute"
    );

    const result = await sut.handle({
      body: {},
      method: "GET",
      params: {},
      query: {},
    });

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toStrictEqual({
      message: "New Data fetched",
    });

    //Behavior
    expect(saveExchangeRegistrationUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(saveExchangeRegistrationUseCaseSpy).toHaveBeenCalledWith();
  });
});
