import { HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') //通过addSelect添加password查询， 否则无法做密码对比
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new HttpException({ message: '用户名不存在', code: 400 }, 200);
    }
    if (!compareSync(password, user.password)) {
      throw new HttpException({ message: '密码错误！', code: 400 }, 200);
    }
    return user;
  }
}
