import { User } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import prisma from "../db/prisma";
import { UserMapper } from "../mappers";

export class UserRepositoryImpl implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
   const result = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return result ? new UserMapper().toDomain(result) : null
  }
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
