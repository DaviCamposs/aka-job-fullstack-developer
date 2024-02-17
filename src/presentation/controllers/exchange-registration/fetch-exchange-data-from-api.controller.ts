import { ISaveExchangeRegistrationUseCase } from "../../../domain/usecases";
import { handleRequestError, ok } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class FetchExchangeDataFromAPIController implements Controller {
  constructor(
    private readonly _saveExchangeRegistrationUseCase: ISaveExchangeRegistrationUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      await this._saveExchangeRegistrationUseCase.execute();

      return ok({
        message: "New Data fetched",
      });
    } catch (error: unknown) {
      return handleRequestError(error);
    }
  }
}
