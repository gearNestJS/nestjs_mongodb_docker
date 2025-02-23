import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  breed?: string;
}
