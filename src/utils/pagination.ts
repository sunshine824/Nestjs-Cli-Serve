import { getConnection, SelectQueryBuilder } from 'typeorm';

interface IFindPageFun {
  tableName: string;
  builder: {
    skip: number;
    take: number;
    where: any;
    orderBy: any;
    [key: string]: any;
  };
  [key: string]: any;
}

// 分页结果接口
export interface IPageResult<T> {
  pages?: number; // 总分页数
  size?: number; // 每页显示数量
  total?: number; // 查询总数
  current?: number; // 当前分页
  records?: T[]; // 分页列表数据
}

// 分页实例
export class Pagination<T> {
  private entity = null;
  private Page: IPageResult<T> = {
    pages: 1, // 总页数
    size: 10, // 每页显示数量
    total: 0, // 总条数
    current: 1, // 当前分页
    records: [], // 分页列表数据
  };

  constructor(params: IPageResult<T>, entity: any) {
    Object.assign(this.Page, params);
    this.entity = entity;
  }

  // 生成查询条件
  private generateCondition(builder, tableName) {
    let db = getConnection().createQueryBuilder<T>(this.entity, tableName);
    Object.keys(builder).map((key) => {
      const type = Object.prototype.toString.call(builder[key]);
      const isArray = type === '[object Array]';
      if (isArray) {
        db = db[key](...builder[key]);
      } else {
        db = db[key](builder[key]);
      }
    });
    return db;
  }

  // 分页查询
  public async findByPage(db: SelectQueryBuilder<T>) {
    const [data, total] = await db.getManyAndCount();
    // 总页数
    const pages = Math.ceil(total / this.Page.size);
    // 返回分页数据
    const result = { ...this.Page, ...{ records: data, total, pages } };
    return result;
  }
}
