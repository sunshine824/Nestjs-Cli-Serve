import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisInstance } from 'src/cache/redis';
import { RoleEntity } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { listToTree } from 'src/utils/utils';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 获取用户信息
  getUser(user: Partial<User>) {
    const existUser = this.userRepository.findOne({
      where: { id: user.id, username: user.username },
    });

    return existUser;
  }

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
  }

  // 用户登录
  async login(user: Partial<User>) {
    const token = this.createToken(user);
    const redis = new RedisInstance(0);
    redis.setItem(`user-token-${user.id}-${user.username}`, token, 60 * 60 * 8);

    const Role = await getConnection()
      .createQueryBuilder<RoleEntity>(RoleEntity, 'role')
      .where('role.id = :id', { id: user.roleId })
      .leftJoinAndSelect('role.menus', 'menus')
      .getOne();

    return {
      permissionList: listToTree(Role.menus || []), // 菜单权限,
      userInfo: user,
      token,
    };
  }
}
