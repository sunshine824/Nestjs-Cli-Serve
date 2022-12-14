import { SelectQueryBuilder } from 'typeorm';
import { IPageResult } from './common';

// 分页实例
export class Pagination<T> {
  private Page: IPageResult<T> = {
    pages: 1, // 总页数
    size: 10, // 每页显示数量
    total: 0, // 总条数
    current: 1, // 当前分页
    records: [], // 分页列表数据
  };

  // 分页查询
  public async findByPage<T>(queryBuilder: SelectQueryBuilder<T>) {
    const data = queryBuilder
  }
}
