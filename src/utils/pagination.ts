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
export type IPageResult<T> = {
  pages?: number; // 总分页数
  size?: number; // 每页显示数量
  total?: number; // 查询总数
  current?: number; // 当前分页
  records?: T[]; // 分页列表数据
};

export type ISqlOptions<T> = {
  sql: string; // 原生sql
  parameters?: T[];
};

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

  // 分页查询
  public async findByPage(db: SelectQueryBuilder<T>, queryFun = 'getMany') {
    const data = await db[queryFun]();
    const total = await db.getCount();
    // 总页数
    const pages = Math.ceil(total / this.Page.size);
    // 返回分页数据
    const result = { ...this.Page, ...{ records: data, total, pages } };
    return result;
  }

  //分页查询(原生)
  public async findByPageSql<T>(options: ISqlOptions<T>) {
    let { sql, parameters } = options;
    // 查找sql中select位置
    let selectIndex = sql.indexOf('SELECT');
    selectIndex = selectIndex < 0 ? sql.indexOf('select') : selectIndex;
    // 查找sql中from的位置
    let fromIndex = sql.indexOf('from');
    fromIndex = fromIndex < 0 ? sql.indexOf('FROM') : fromIndex;

    if (selectIndex < 0 || fromIndex < 0) {
      throw new Error('sql is invalid');
    }

    const selectFields = sql.slice(selectIndex + 6, fromIndex);
    // 重组sql用于查询总数
    const countSql = sql.replace(selectFields, ' count(1) as total ');
    // 总条数
    this.Page.total =
      (await getConnection().query(countSql, parameters))[0].total * 1;
    // 总页数
    this.Page.pages = Math.ceil(this.Page.total / this.Page.size);
    const page = (this.Page.current - 1) * this.Page.size;
    sql = `${sql} limit ${page},${this.Page.size}`;
    // 查询结果数据
    this.Page.records = await getConnection().query(sql, parameters);

    return this.Page;
  }
}
