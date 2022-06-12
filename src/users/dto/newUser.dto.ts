import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString, Length } from 'class-validator';
import { UpdateUserDto } from './updateUser.dto';

export class CreateUserDto extends UpdateUserDto {
  //! extends UpdateUserDto
  @ApiProperty()
  @Length(4, 22)
  @IsAlphanumeric()
  @IsString()
  username: string;
}
