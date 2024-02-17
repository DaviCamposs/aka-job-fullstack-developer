export class ExchangeRegistrationCache {
    _code_source: string
    _code_destination: string
    _acronym: string
    _max: number
    _min: number
    _avg: number
    _day: string
    _month: string
    _year: string
    _date: string
    _type_register: 'day' | 'hour'

    constructor(
        code_source: string,
        code_destination: string,
        acronym: string,
        max: number,
        min: number,
        avg: number,
        day: string,
        month: string,
        year: string,
        date: string,
        type_register: 'day' | 'hour'
    ) {
        this._code_source = code_source;
        this._code_destination = code_destination;
        this._acronym = acronym;
        this._max = max;
        this._min = min;
        this._avg = avg;
        this._day = day;
        this._month = month;
        this._year = year;
        this._date = date;
        this._type_register = type_register;
    }
    

    get code_source(): string {
        return this._code_source;
    }

    get code_destination(): string {
        return this._code_destination;
    }

    get acronym(): string {
        return this._acronym;
    }

    get max(): number {
        return this._max;
    }

    get min(): number {
        return this._min;
    }

    get avg(): number {
        return this._avg;
    }

    get day(): string {
        return this._day;
    }

    get month(): string {
        return this._month;
    }

    get year(): string {
        return this._year;
    }

    get date(): string {
        return this._date;
    }

    get type_register(): 'day' | 'hour' {
        return this._type_register;
    }
}