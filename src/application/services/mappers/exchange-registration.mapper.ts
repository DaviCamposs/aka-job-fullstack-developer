import { ExchangeRegistration } from "../../../domain/entities";
import {
  ExchangeRegistrationAPIData,
  ExchangeRegistrationAPIResponse,
} from "../../../domain/services/@types";
import { Mapper } from "../../../infrastructure/mappers/mapper.interface";

export class ExchangeRegistrationAPIMapper
  implements Mapper<ExchangeRegistrationAPIResponse, ExchangeRegistration[]>
{
  toDomain(data: ExchangeRegistrationAPIResponse): ExchangeRegistration[] {
    const result: ExchangeRegistration[] = [];

    for (const key in data) {
      const item = data[key];

      result.push(
        new ExchangeRegistration(item.code, item.codein, Number(item.bid), null)
      );
    }

    return result;
  }
}
