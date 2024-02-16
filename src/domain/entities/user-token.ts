export class UserToken {
    _id: number
    _name: string
    _email: string
    _token: string

    constructor(id: number , name: string , email: string , token: string) {
        this._id = id
        this._name = name
        this._email = email
        this._token = token
    }

    get id(): number {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }

    get token(): string {
        return this._token
    }
}