import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsInt, IsString, Length } from 'class-validator';

export class userDto {
  //user ID
  @ApiProperty()
  @IsString()
  @Length(1, 200)
  user: string;
}

