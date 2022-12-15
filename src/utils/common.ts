import { ApiProperty } from '@nestjs/swagger';

// 分页验证DTO接口
export class PaginationDto {
  @ApiProperty({ description: '当前分页' })
  pageNo: number;

  @ApiProperty({ description: '每页数据量' })
  pageSize: number;
}

