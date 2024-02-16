import { UserToken } from "./user-token"

describe('UserToken unit tests', () => {
    it('should create userToken with correct values when called', () => {
        // Act
        const userToken = new UserToken(1,'David','david@mail.com','1234')

        // Assert
        expect(userToken.id).toBe(1)
        expect(userToken.name).toBe('David')
        expect(userToken.email).toBe('david@mail.com')
        expect(userToken.token).toBe('1234')

    })
})