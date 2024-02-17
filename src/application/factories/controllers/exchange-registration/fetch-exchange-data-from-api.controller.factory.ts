import { ISaveExchangeRegistrationUseCase } from "../../../../domain/usecases";
import { FetchExchangeDataFromAPIController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { saveExchangeRegistrationUseCaseFactory } from "../../usecases";

export const fetchExchangeDataFromAPIControllerFactory = (): Controller => {
  const saveExchangeRegistrationUseCase: ISaveExchangeRegistrationUseCase =
    saveExchangeRegistrationUseCaseFactory();

  return new FetchExchangeDataFromAPIController(
    saveExchangeRegistrationUseCase
  );
};
