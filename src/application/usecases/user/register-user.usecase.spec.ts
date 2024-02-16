import { User } from "../../../domain/entities";
import { IUserRepository } from "../../../domain/repositories";
import { IUserService } from "../../../domain/services";
import { IRegisterUserUseCase } from "../../../domain/usecases";
import { RegisterUserUseCaseImpl } from "./register-user.usecase";

interface SutTypes {
    userService: IUserService,
    userRepository: IUserRepository,
    sut: IRegisterUserUseCase
}

const makeSut = (): SutTypes => {
    const userService: IUserService = {
        createUser: jest.fn()
    }

    const userRepository: IUserRepository = {
        save: jest.fn()
    }

    const sut: IRegisterUserUseCase = new RegisterUserUseCaseImpl(userService,userRepository)

    return {
        userService,
        userRepository,
        sut
    }
}

describe('RegisterUserUseCaseImpl unit tests', () => {
    it('should save user when called', async () => {
        // Arrange
        const { userService , userRepository , sut } = makeSut()

        const userServiceSpy = jest.spyOn(userService,'createUser').mockReturnValue(new User('David','david@mail.com','encryptedPassword'))
        const userRepositorySpy = jest.spyOn(userRepository,'save')

        // Act
        await sut.execute('David','david@mail.com','12345678')

        // Behaviors
        expect(userServiceSpy).toHaveBeenCalledTimes(1)
        expect(userServiceSpy).toHaveBeenCalledWith('David','david@mail.com','12345678')
        expect(userRepositorySpy).toHaveBeenCalledTimes(1)
        expect(userRepositorySpy).toHaveBeenCalledWith(expect.objectContaining({
            _name: 'David',
            _email: 'david@mail.com',
            _password: 'encryptedPassword'
        }))

    })
})