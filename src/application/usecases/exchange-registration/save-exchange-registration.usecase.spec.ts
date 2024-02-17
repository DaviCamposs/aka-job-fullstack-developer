import { ExchangeRegistration } from "../../../domain/entities";
import { IExchangeRegistrationRepository } from "../../../domain/repositories";
import { IExchangeRegistrationService } from "../../../domain/services";
import { ISaveExchangeRegistrationUseCase } from "../../../domain/usecases";
import { SaveExchangeRegistrationUseCaseImpl } from "./save-exchange-registration.usecase";

interface SutTypes {
    exchangeRegistrationService: IExchangeRegistrationService
    exchangeRegistrationRepository: IExchangeRegistrationRepository
    sut: ISaveExchangeRegistrationUseCase
}

const makeSut = (): SutTypes => {
    const exchangeRegistrationService: IExchangeRegistrationService = {
        retrieveExchangeValues: jest.fn()
    }

    const exchangeRegistrationRepository: IExchangeRegistrationRepository = {
        save: jest.fn()
    }

    const sut: ISaveExchangeRegistrationUseCase = new SaveExchangeRegistrationUseCaseImpl(exchangeRegistrationService,exchangeRegistrationRepository)

    return {
        exchangeRegistrationService,
        exchangeRegistrationRepository,
        sut
    }
}

describe('SaveExchangeRegistrationUseCaseImpl unit tests', () => {
    it('should save exchange results', async () => {
        // Arrange
        const {
            exchangeRegistrationRepository, exchangeRegistrationService, sut
        } = makeSut()
        const exchangeRegistrations = [
            new ExchangeRegistration('BRL-USD','BRL','USD',100 , 'date'),
            new ExchangeRegistration('BRL-USD','EUR','JPY',50 , 'date 2')

        ]

        const exchangeRegistrationServiceSpy = jest.spyOn(exchangeRegistrationService,'retrieveExchangeValues').mockResolvedValue(exchangeRegistrations)
        const exchangeRegistrationRepositorySpy = jest.spyOn(exchangeRegistrationRepository,'save')

        // Act
        await sut.execute()

        // Behaviors
        expect(exchangeRegistrationServiceSpy).toHaveBeenCalledTimes(1)
        expect(exchangeRegistrationServiceSpy).toHaveBeenCalledWith( ['USD-BRL', 'BRL-USD', 'EUR-BRL', 'BRL-EUR', 'BRL-ARS', 'ARS-BRL','JPY-BRL','BRL-JPY'])

        expect(exchangeRegistrationRepositorySpy).toHaveBeenCalledTimes(1)
        expect(exchangeRegistrationRepositorySpy).toHaveBeenCalledWith(exchangeRegistrations)

    })
} )