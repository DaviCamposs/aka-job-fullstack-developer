import { User } from "../../domain/entities";
import { IAuthenticationService } from "../../domain/services";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET ?? 'secret'

export class AuthenticationServiceImpl implements IAuthenticationService {
    generateToken(user: User): string {
        return jwt.sign({
            id: user.id,
            email: user.email
        }, SECRET_KEY, { expiresIn: '1h' });
    }
    
}