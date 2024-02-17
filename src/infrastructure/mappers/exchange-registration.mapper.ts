import { ExchangeRegistration } from "../../domain/entities";
import { IExchangeRegistrationEntity } from "../schemas";
import { Mapper } from "./mapper.interface";

export class ExchangeRegistrationMapper
  implements Mapper<IExchangeRegistrationEntity[], ExchangeRegistration[]>
{
  toDomain(data: IExchangeRegistrationEntity[]): ExchangeRegistration[] {
    const result: ExchangeRegistration[] = [];

    for (const item of data) {
      result.push(
        new ExchangeRegistration(
          item.acronym,
          item.code_source,
          item.code_destination,
          item.value,
          item.date
        )
      );
    }

    return result;
  }
}
