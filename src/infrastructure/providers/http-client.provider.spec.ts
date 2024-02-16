import { HttpClientProviderImpl } from "./http-client.provider"

describe('HttpClientProviderImpl unit tests', () => {
    it('should get an array of GET request', async () => {
        // Arrange
        const sut = new HttpClientProviderImpl()
        
        // Act
        const result = await sut.fetch({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'get'
        })

        // Assert
        expect(result.status).toBe(200)
        expect(result.data).toHaveLength(10)
        
    })
})