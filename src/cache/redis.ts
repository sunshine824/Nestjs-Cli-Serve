import Redis from 'ioredis';
import envConfig from '../../config';

export class RedisInstance extends Redis {
  constructor(db: number = 0) {
    super({ ...envConfig.REDIS, db })
  }

  /**
   * @Description: 封装设置redis缓存的方法
   * @param key {String} key值
   * @param value {String} key的值
   * @param seconds {Number} 过期时间
   * @return: Promise<any>
   */
  public async setItem(
    key: string,
    value: any,
    seconds?: number,
  ): Promise<any> {
    value = JSON.stringify(value);
    if (!seconds) {
      await this.set(key, value);
    } else {
      await this.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @Description: 设置获取redis缓存中的值
   * @param key {String}
   */
  public async getItem(key: string): Promise<any> {
    const data = await this.get(key);
    if (data) return JSON.parse(data);
    return null;
  }

  /**
   * @Description: 根据key删除redis缓存数据
   * @param key {String}
   * @return:
   */
  public async removeItem(key: string): Promise<any> {
    return await this.del(key);
  }

  /**
   * @Description: 清空redis的缓存
   * @param {type}
   * @return:
   */
  public async clear(): Promise<any> {
    return await this.flushall();
  }
}
