export class User {
  _id!: number;
  _name: string;
  _email: string;
  _password: string;

  constructor(name: string, email: string, password: string, id?: number) {
    if (id) this._id;
    
    this._name = name;
    this._email = email;
    this._password = password;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  set id(id: number) {
    this._id = id;
  }
}
