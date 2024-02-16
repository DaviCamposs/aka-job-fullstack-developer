import { IRegisterUserUseCase } from "../../../domain/usecases";
import { created, handleRequestError } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class RegisterUserController implements Controller {

    constructor(
        private readonly _registerUserUseCase: IRegisterUserUseCase
    ) {}

    async handle(request: IHttpRequest): Promise<IHttpResponse> {
       try {

        const { name , email , password  } = request.body

        await this._registerUserUseCase.execute(name,email,password)

        return created({
            message: 'user registered!'
        })

       } catch (error: unknown) {
            return handleRequestError(error)
       }
    }
    
}