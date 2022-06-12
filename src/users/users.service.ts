import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await this.findOne(username);
    return !!user;
  }

  async newUser(
    username: string,
    name: string,
    password: string,
  ): Promise<User> {
    if (await this.usernameExists(username)) {
      return null;
    }

    let user = new User();
    user.username = username;
    user.name = name;
    user = this.setPassword(user, password);

    return this.usersRepository.save(user);
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne(
      { username },
      /* { cache: { id: `username-${username}`, milliseconds: 10 * 1000 } }, */
    );
  }

  findId(id: number): Promise<User> {
    return this.usersRepository.findOne(
      id,
      /* { cache: { id: `user-${id}`, milliseconds: 10 * 1000, }, */
    );
  }

  checkPassword(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
  }

  setPassword(user: User, password: string) {
    user.password = bcrypt.hashSync(password, 10);
    // this.breakCache(user);
    return user;
  }

  updateName(user: User, name: string) {
    user.name = name;
    // this.breakCache(user);
    return this.usersRepository.save(user);
  }

  // private breakCache(user: User) {
  //   this.connection.queryResultCache.remove([`user-${user.id}`]);
  // }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  maskUser(user: User) {
    return {
      ...user,
      password: undefined,
    };
  }
}
