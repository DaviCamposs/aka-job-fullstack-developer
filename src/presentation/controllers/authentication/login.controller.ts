import { IAuthenticateUserUseCase } from "../../../domain/usecases";
import { handleRequestError, ok } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class LoginController implements Controller {
  constructor(
    private readonly _authenticateUserUseCase: IAuthenticateUserUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = request.body;

      const result = await this._authenticateUserUseCase.execute(
        email,
        password
      );

      return ok({
        id: result.id,
        name: result.name,
        email: result.email,
        token: result.token
      });
    } catch (error: unknown) {
      return handleRequestError(error);
    }
  }
}
