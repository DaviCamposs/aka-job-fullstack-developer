import { ExchangeRegistrationCache } from "../../domain/entities";
import { IExchangeRegistrationCacheRepository } from "../../domain/repositories";
import prisma from "../db/prisma";

export class ExchangeRegistrationCacheRepositoryImpl implements IExchangeRegistrationCacheRepository {
    async save(data: ExchangeRegistrationCache[]): Promise<void> {
        await prisma.exchangeRegistrationCache.createMany({
            data: data.map((item) => {
              return {
                acronym: item.acronym,
                code_source: item.code_source,
                code_destination: item.code_destination,
                min: item.min,
                max: item.max,
                avg: item.avg,
                day: item.day,
                month: item.month,
                year: item.year,
                type_register: item.type_register,
                date: item.date,
              };
            }),
          });
    }
    
}