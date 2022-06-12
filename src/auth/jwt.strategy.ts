import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { constants } from '../constants';
import { HttpMessage } from '../common/utils/messages/http-message.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;
    const user = await this.authService.validateUserById(userId);
    if (!user) {
      throw new HttpException(
        HttpMessage.USER_INVALID_TOKEN,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
