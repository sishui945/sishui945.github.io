import { IsOptional, IsString } from 'class-validator'
export class QueryPostsDto {
  @IsOptional()
  @IsString()
  tag?: string
}
