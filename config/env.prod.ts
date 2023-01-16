export default {
  // token密钥
  SECRET: 'test123456',
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost', // 主机，默认为localhost
    port: 3306, // 端口号
    username: 'root', // 用户名
    password: '123456', // 密码
    database: 'nest_admin', //数据库名
    dateStrings: true, // 设置返回日期为字符串
    autoLoadEntities: true, // 使用这个配置自动导入entities
    synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
  },
  // redis配置
  REDIS: {
    port: 6379, //Redis 端口
    host: '127.0.0.1', //Redis 域名
    db: 0,
    family: 4,
    password: '123456', //'Redis 访问密码'
  },
};
