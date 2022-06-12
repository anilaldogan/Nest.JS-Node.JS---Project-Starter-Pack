import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

/* 
Burayı Query oluşturmak için kullanacağız

Örnekler:

  async getOneByEmail(email: string): Promise<User | undefined> {
    return await this.createQueryBuilder("user")
      .where("user.email = (:email)", { email })
      .addSelect("user.password")
      .getOne();
  }

  async getOneByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    return await this.createQueryBuilder("user")
      .where("user.email = (:email)", { email })
      .andWhere("user.password = (:password)", { password })
      .getOne();
  }

  async getOneByEmailAndPasswordAndId(email: string, password: string, id: number): Promise<User | undefined> {
    return await this.createQueryBuilder("user")
      .where("user.email = (:email)", { email })
      .andWhere("user.password = (:password)", { password })
      .andWhere("user.id = (:id)", { id })
      .getOne();
  }


  --------------------------------------------------------------------------------
  --------------------------------------------------------------------------------

  const User = await this.UserRepository.find({
    where: { user },
    relations: ['user'],  
    order: {
      dateCreated: 'DESC',
    },
    skip: 1,
    take: 2,
    cache: true,
  });

  const User = await this.UserRepository.find({
    where: { user },
    relations: ['user'],
    order: {
      dateCreated: 'DESC',
    },
    skip: 1,
    take: 2,
    cache: {
      id: 'User',
      milliseconds: 10000,
      check: {
        id: 'User',
        milliseconds: 10000,
      },
    },
  });

*/
