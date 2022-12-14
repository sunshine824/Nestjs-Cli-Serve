import { ApiProperty } from '@nestjs/swagger';

// 分页验证DTO接口
export class PaginationDto {
  @ApiProperty({ description: '当前分页' })
  pageNo: number;

  @ApiProperty({ description: '每页数据量' })
  pageSize: number;
}

// 分页结果接口
export interface IPageResult<T> {
  pages: number; // 总分页数
  size: number; // 每页显示数量
  total: number; // 查询总数
  current: number; // 当前分页
  records: T[]; // 分页列表数据
}
