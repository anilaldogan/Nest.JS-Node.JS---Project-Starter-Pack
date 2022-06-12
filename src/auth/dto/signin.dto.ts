import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 22)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 22)
  password: string;
}
