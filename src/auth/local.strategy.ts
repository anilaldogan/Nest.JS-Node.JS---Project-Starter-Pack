import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpMessage } from '../common/utils/messages/http-message.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // ? problem with passport-local validation

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        {
          user: false,
          authenticated: false,
          message: HttpMessage.USER_INVALID_USERNAME_PASSWORD,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
