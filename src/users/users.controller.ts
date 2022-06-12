import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from '../auth/login.guard';
import { User } from './user.entity';
import { CreateUserDto } from './dto/newUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoggedUser } from './user.decorator';
import { UsersService } from './users.service';
import { HttpMessage } from '../common/utils/messages/http-message.enum';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { username, name, password } = createUserDto;
    const user = await this.usersService.newUser(username, name, password);
    if (!user) {
      throw new HttpException(
        HttpMessage.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }
    return this.me(user);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(LoginGuard)
  @SkipThrottle()
  async me(@LoggedUser() user: User) {
    return {
      user: this.usersService.maskUser(user),
    };
  }

  @Get('users')
  @ApiBearerAuth()
  @UseGuards(LoginGuard)
  async users() {
    return await this.usersService.users().then((result) => {
      return result.map( user => this.usersService.maskUser(user));
    });
  }

  @Put('me')
  @ApiBearerAuth()
  @UseGuards(LoginGuard)
  async updateUser(
    @LoggedUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { name, password } = updateUserDto;

    if (password) {
      this.usersService.setPassword(user, password);
    }

    await this.usersService.updateName(user, name);

    return this.me(user);
  }
}
