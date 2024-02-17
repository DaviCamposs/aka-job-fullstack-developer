import { Prisma } from "@prisma/client";
import { ExchangeRegistration } from "../../domain/entities";
import { IExchangeRegistrationRepository } from "../../domain/repositories";
import prisma from "../db/prisma";
import { ExchangeRegistrationMapper } from "../mappers";

export class ExchangeRegistrationRepositoryImpl
  implements IExchangeRegistrationRepository
{
  async find(acronym: string, day: string | undefined , month: string, year: string): Promise<ExchangeRegistration[]> {
     // Parse the month, year, and day strings into integers
     const monthNumber = parseInt(month);
     const yearNumber = parseInt(year);
 
     // Construct the start and end dates for the month
     let startDate = new Date(yearNumber, monthNumber - 1, 1).toISOString();
     let endDate = new Date(yearNumber, monthNumber, 0).toISOString();
 
     // If day is provided, adjust the start and end dates accordingly
     if (day) {
         const dayNumber = parseInt(day);
         startDate = new Date(yearNumber, monthNumber - 1, dayNumber).toISOString();
         endDate = new Date(yearNumber, monthNumber - 1, dayNumber + 1).toISOString();
     }
 
     // Perform the Prisma query using the date range
     const records = await prisma.exchangeRegistration.findMany({
         where: {
             AND: [
                 { acronym },
                 { date: { gte: startDate } }, // Greater than or equal to the start date
                 { date: { lt: endDate } }     // Less than the end date
             ]
         }
     });
 
      return new ExchangeRegistrationMapper().toDomain(records)


  }
  async save(data: ExchangeRegistration[]): Promise<void> {
    await prisma.exchangeRegistration.createMany({
      data: data.map((item) => {
        return {
          acronym: item.acronym,
          code_source: item.code_source,
          code_destination: item.code_destination,
          value: item.value,
          date: item.date,
        };
      }),
    });
  }

  
}
