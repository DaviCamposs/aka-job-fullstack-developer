import { IGenerateExchangeRegistrationHistoryUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { GetExchangeHistoryController } from "./get-exchange-history.controller";

interface SutTypes {
  generateExchangeRegistrationHistoryUseCase: IGenerateExchangeRegistrationHistoryUseCase;
  sut: Controller;
}

const makeSut = (): SutTypes => {
  const generateExchangeRegistrationHistoryUseCase: IGenerateExchangeRegistrationHistoryUseCase =
    {
      execute: jest.fn(),
    };
  const sut: Controller = new GetExchangeHistoryController(
    generateExchangeRegistrationHistoryUseCase
  );

  return {
    generateExchangeRegistrationHistoryUseCase,
    sut,
  };
};

describe('GetExchangeHistoryController unit tests', () => {
    it('should calculate history when there is no cache', async () => {
        // Arrange
        const {
            generateExchangeRegistrationHistoryUseCase,
            sut
        } = makeSut()

        const generateExchangeRegistrationHistoryUseCaseSpy = jest.spyOn(generateExchangeRegistrationHistoryUseCase,'execute').mockResolvedValue([
            {
                data: [],
                day: 'day'
            }
        ])

        // Act
        const result = await sut.handle({
            body: {},
            method: 'GET',
            params: {},
            query: {
                acronym: 'BRL-USD',
                day: '01',
                month: '10',
                year: '2024'
            }
        })

        // Assert
        expect(result.statusCode).toBe(200)
        expect(result.body).toStrictEqual([{
            data: [],
            day: 'day'
        }])

        // Behaviors
        expect(generateExchangeRegistrationHistoryUseCaseSpy).toHaveBeenCalledTimes(1)
        expect(generateExchangeRegistrationHistoryUseCaseSpy).toHaveBeenCalledWith('BRL-USD','01','10','2024')

    })
})
