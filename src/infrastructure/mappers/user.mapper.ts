import { IUserEntity } from "../schemas";
import { Mapper } from "./mapper.interface";
import { User } from "../../domain/entities";

export class UserMapper implements Mapper<IUserEntity, User> {
  toDomain(data: IUserEntity): User {
    return new User(data.name, data.email, data.password, data.id);
  }
}
