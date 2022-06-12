import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class vehiclesDto {
  @ApiProperty()
  @Length(3, 200)
  @IsString()
  content: string;

  @ApiProperty()
  @Length(6, 10)
  @IsString()
  plate: string;
}
/*

Sample code for this snippet:

export class CreateCatDto {
  name: string;
  breed: string;
}

export class AdditionalCatInfo {
  color: string;
}

export class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}

*/
