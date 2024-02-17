export class OperationalError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'OperationalError'
    }
}