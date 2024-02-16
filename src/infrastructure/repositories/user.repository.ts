import { User } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import prisma from "../db/prisma";

export class UserRepositoryImpl implements IUserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
