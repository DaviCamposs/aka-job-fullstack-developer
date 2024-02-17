export class ExchangeRegistration {
  _id!: number;
  _acronym: string
  _code_source: string;
  _code_destination: string;
  _value: number;
  _date: string;

  constructor(
    acronym: string,
    code_source: string,
    code_destination: string,
    value: number,
    date: string | null,
    id?: number
  ) {
    if (id) this._id = id;

    this._acronym = acronym
    this._code_source = code_source;
    this._code_destination = code_destination;
    this._value = value;
    this._date = date || new Date().toISOString()
  }

  get id(): number {
    return this._id
  }

  get acronym(): string {
    return this._acronym
  }

  get code_source(): string {
    return this._code_source
  }

  get code_destination(): string {
    return this._code_destination
  }

  get value(): number {
    return this._value
  }

  get date(): string {
    return this._date
  }

}
