interface listToTree {}

/**
 * 递归返回树结构
 * @param data 原数据列表
 * @param replaceFields 替换字段 default:{children:'children', parentId:'parentId', id:'id'}
 * @returns
 */
export interface ReplaceFields {
  children?: string;
  parentId?: string;
  id?: string;
  [key: string]: string;
}
export const listToTree = <T>(data, replaceFields?: ReplaceFields): T[] => {
  replaceFields = Object.assign(
    { children: 'children', parentId: 'parentId', id: 'id' },
    replaceFields,
  );
  const treeData: T[] = [];
  const mapData = {};
  data.forEach((item) => {
    mapData[item[replaceFields['id']]] = item;
  });

  data.forEach((item) => {
    const parent = mapData[item[replaceFields['parentId']]];
    if (parent) {
      const children = parent[replaceFields['children']];
      children || (parent[replaceFields['children']] = []);
      parent[replaceFields['children']].push(item);
    } else {
      treeData.push(item);
    }
  });
  return treeData;
};

/**
 * 生成where查询条件
 * @param query 接口获取到的查询参数
 * @param keys 需要返回的查询参数
 */

export const createQueryCondition = (
  query: { [key: string]: any },
  keys: string[],
): { [key: string]: any } => {
  let newMap = {};
  const fields = Object.keys(query);
  fields.forEach((key) => {
    if (keys.includes(key) && query[key] != undefined && query[key] != null) {
      newMap[key] = query[key];
    }
  });
  return newMap;
};
