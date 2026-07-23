import { IsOptional, IsString } from 'class-validator'

export class QueryTutorialsDto {
  @IsOptional()
  @IsString()
  category?: string
}
