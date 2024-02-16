import { IAuthenticationService } from "../../../domain/services";
import { AuthenticationServiceImpl } from "../../../infrastructure/services";

export const authenticationServiceFactory = (): IAuthenticationService => {
    return new AuthenticationServiceImpl()
}