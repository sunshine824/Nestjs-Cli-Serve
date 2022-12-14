import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/common';

export class QueryRoleDto extends PartialType(PaginationDto) {
  @ApiPropertyOptional({ description: '' })
  name: string;
}
