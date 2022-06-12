import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @Length(4, 22)
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    example: 'qwerty1234',
    description: 'Password',
  })
  @IsOptional()
  @Length(6, 22)
  @IsString()
  password: string;
}
