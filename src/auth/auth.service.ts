import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisInstance } from 'src/cache/redis';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 获取用户信息
  getUser(user: Partial<User>) {
    const existUser = this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: user.id })
      .where('user.username=:username', { username: user.username })
      .getOne();

    return existUser;
  }

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }

  // 用户登录
  login(user: Partial<User>) {
    const token = this.createToken(user);
    const redis = new RedisInstance(0);
    redis.setItem(`user-token-${user.id}-${user.username}`, token, 60 * 60 * 8);
    return {
      permissionList: [],
      userInfo: user,
      token,
    };
  }
}
