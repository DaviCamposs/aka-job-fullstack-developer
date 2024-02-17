import { IGenerateExchangeRegistrationHistoryUseCase } from "../../../domain/usecases";
import { handleRequestError, ok } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class GetExchangeHistoryController implements Controller {
  constructor(
    private readonly _generateExchangeRegistrationHistoryUseCase: IGenerateExchangeRegistrationHistoryUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { acronym, day, month, year } = request.query;

      // TODO: Add cache

      const result =
        await this._generateExchangeRegistrationHistoryUseCase.execute(
          acronym,
          day,
          month,
          year
        );

      return ok(result);
    } catch (error: unknown) {
      return handleRequestError(error);
    }
  }
}
