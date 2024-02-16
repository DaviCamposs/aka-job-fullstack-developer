import { UserToken } from "../../../domain/entities";
import { IAuthenticateUserUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { LoginController } from "./login.controller";

interface SutTypes {
    authenticateUserUseCase: IAuthenticateUserUseCase
    sut: Controller
}

const makeSut = (): SutTypes => {
    const authenticateUserUseCase: IAuthenticateUserUseCase = {
        execute: jest.fn()
    }

    const sut: Controller = new LoginController(authenticateUserUseCase)

    return {
        authenticateUserUseCase,
        sut
    }
}

describe('loginController unit tests', () => {
    it('should return correct result when called', async () => {
        // Arrange
        const {
            sut, 
            authenticateUserUseCase
        } = makeSut()
        const userToken = new UserToken(1,'david','david@mail.com','token')
        const authenticateUserUseCaseSpy = jest.spyOn(authenticateUserUseCase,'execute').mockResolvedValue(userToken)

        // Act
        const result = await sut.handle({
            method: 'POST',
            body: {
                email: 'david@mail.com',
                password: 'password'
            },
            params: {},
            query: {}
        })

        // Assert
        expect(result.statusCode).toBe(200)
        expect(result.body).toStrictEqual({
            id: 1,
            name: 'david',
            email: 'david@mail.com',
            token: 'token'
        })

        // Behaviors
        expect(authenticateUserUseCaseSpy).toHaveBeenCalledTimes(1)
        expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith('david@mail.com','password')

    })
})