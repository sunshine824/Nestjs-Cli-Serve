export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    port: 3000, // 端口
  },
  // token密钥
  SECRET: 'test123456',
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost', // 主机，默认为localhost
    port: 3306, // 端口号
    username: 'root', // 用户名
    password: '123456', // 密码
    database: 'blog', //数据库名
    autoLoadEntities: true, // 使用这个配置自动导入entities
    synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
  },
};
