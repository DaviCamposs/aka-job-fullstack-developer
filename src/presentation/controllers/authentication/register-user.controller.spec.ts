import { IRegisterUserUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { RegisterUserController } from "./register-user.controller";

interface SutTypes {
    registerUserUseCase: IRegisterUserUseCase
    sut: Controller
}

const makeSut = (): SutTypes => {
   const registerUserUseCase: IRegisterUserUseCase = {
    execute: jest.fn()
   }

   const sut: Controller = new RegisterUserController(registerUserUseCase)

   return {
    registerUserUseCase,
    sut
   }
}

describe('RegisterUserController unit tests', () => {
    it('should register user and send confirmation when called', async () => {
        // Arrange
        const {
            sut , 
            registerUserUseCase
        } = makeSut()

        const registerUserUseCaseSpy = jest.spyOn(registerUserUseCase,'execute')

        // Act
        const result = await sut.handle({
            method: 'POST',
            params: {},
            query: {},
            body: {
                name: 'David',
                email: 'david@mail.com',
                password: '12345678'
            }
        })

        // Assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toStrictEqual({
            message: 'user registered!'
        })

        // Behaviors
        expect(registerUserUseCaseSpy).toHaveBeenCalledTimes(1)
        expect(registerUserUseCaseSpy).toHaveBeenCalledWith('David','david@mail.com','12345678')

    })
})