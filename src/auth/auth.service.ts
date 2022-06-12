import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpMessage } from '../common/utils/messages/http-message.enum';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserById(id: number) {
    const user = await this.usersService.findId(id);
    if (user) {
      return user;
    }

    return null;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && this.usersService.checkPassword(user, pass)) {
      return {
        ...user,
        password: undefined,
      };
    }

    return null;
  }

  async loginSuccess(user: User) {
    const payload = { sub: user.id };
    return {
      user: this.usersService.maskUser(user),
      authenticated: true,
      message: HttpMessage.USER_LOGGED_IN,
      access_token: this.jwtService.sign(payload),
    };
  }
}
