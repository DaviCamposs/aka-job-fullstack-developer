import { IExchangeRegistrationRepository } from "../../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../../domain/services";
import { ISaveExchangeRegistrationUseCase } from "../../../../domain/usecases";
import { SaveExchangeRegistrationUseCaseImpl } from "../../../usecases";
import { exchangeRegistrationRepositoryFactory } from "../../repositories";
import { exchangeRegistrationServiceFactory } from "../../services";

export const saveExchangeRegistrationUseCaseFactory =
  (): ISaveExchangeRegistrationUseCase => {
    const exchangeRegistrationService: IExchangeRegistrationService =
      exchangeRegistrationServiceFactory();
    const exchangeRegistrationRepository: IExchangeRegistrationRepository =
      exchangeRegistrationRepositoryFactory();

    return new SaveExchangeRegistrationUseCaseImpl(
      exchangeRegistrationService,
      exchangeRegistrationRepository
    );
  };
