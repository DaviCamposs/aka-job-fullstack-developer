import { ExchangeRegistration } from "../../domain/entities";
import { IExchangeRegistrationRepository } from "../../domain/repositories";
import prisma from "../db/prisma";

export class ExchangeRegistrationRepositoryImpl
  implements IExchangeRegistrationRepository
{
  async save(data: ExchangeRegistration[]): Promise<void> {
    await prisma.exchangeRegistration.createMany({
      data: data.map((item) => {
        return {
          code_source: item.code_source,
          code_destination: item.code_destination,
          value: item.value,
          date: item.date,
        };
      }),
    });
  }
}
