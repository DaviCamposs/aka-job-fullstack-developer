import { User } from "../entities";

export interface IAuthenticationService {
    generateToken(user: User): string
}