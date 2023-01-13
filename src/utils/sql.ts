// 查询用户列表
export const getUserPageSql = () => {
  return `select 
    u.id, 
    u.username, 
    u.nickname, 
    u.avatar, 
    u.email, 
    u.create_time, 
    u.phone, 
    u.organizationId, 
    u.roleId, 
    u.birthday, 
    u.sex, 
    o.name organizationName, 
    r.name roleName 
  from 
    user u 
    left join organization o on (u.organizationId = o.id) 
    left join role r on(r.id = u.roleId)`;
};
