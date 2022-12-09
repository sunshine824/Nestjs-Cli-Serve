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
