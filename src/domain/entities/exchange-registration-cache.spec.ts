import { ExchangeRegistration } from "./exchange-registration";
import { ExchangeRegistrationCache } from "./exchange-registration-cache";

describe("ExchangeRegistrationCache unit test", () => {
  it("should create a ExchangeRegistrationCache with correct values", () => {
   // Act
   const exchangeRegistrationCache = new ExchangeRegistrationCache(
    'source',
    'destination',
    'ABC',
    100,
    10,
    50,
    '17',
    '02',
    '2024',
    '2024-02-17',
    'day'
  );

  // Assert
  expect(exchangeRegistrationCache.code_source).toBe('source');
  expect(exchangeRegistrationCache.code_destination).toBe('destination');
  expect(exchangeRegistrationCache.acronym).toBe('ABC');
  expect(exchangeRegistrationCache.max).toBe(100);
  expect(exchangeRegistrationCache.min).toBe(10);
  expect(exchangeRegistrationCache.avg).toBe(50);
  expect(exchangeRegistrationCache.day).toBe('17');
  expect(exchangeRegistrationCache.month).toBe('02');
  expect(exchangeRegistrationCache.year).toBe('2024');
  expect(exchangeRegistrationCache.date).toBe('2024-02-17');
  expect(exchangeRegistrationCache.type_register).toBe('day');
  });
});
