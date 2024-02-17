import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../domain/services";
import { ISaveExchangeRegistrationUseCase } from "../../../domain/usecases";

const DEFAULT_SEARCH = ['USD-BRL', 'BRL-USD', 'EUR-BRL', 'BRL-EUR', 'BRL-ARS', 'ARS-BRL','JPY-BRL','BRL-JPY']

export class SaveExchangeRegistrationUseCaseImpl implements ISaveExchangeRegistrationUseCase {
   
    constructor(
        private readonly _exchangeRegistrationService: IExchangeRegistrationService,
        private readonly _exchangeRegistrationRepository: IExchangeRegistrationRepository
    ) {}
   
    async execute(): Promise<void> {
        const results = await this._exchangeRegistrationService.retrieveExchangeValues(DEFAULT_SEARCH)

        await this._exchangeRegistrationRepository.save(results)
    }
    
}