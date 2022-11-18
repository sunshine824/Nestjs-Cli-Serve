import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePassDto } from './dto/updatePass-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

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
    return {
      token: this.createToken(user),
    };
  }

  // 获取用户信息
  getUser(user: Partial<User>) {
    const existUser = this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: user.id })
      .where('user.username=:username', { username: user.username })
      .getOne();

    return existUser;
  }

  // 用户注册
  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const data = await this.userRepository.findOne({ where: { username } });
    if (data) {
      throw new HttpException({ message: '用户已存在', code: 400 }, 200);
    }
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // 更新用户信息
  async update(user: Partial<User>, info: UpdateUserDto) {
    await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set(info)
      .where('user.id=:id', { id: user.id })
      .execute();
    return await this.userRepository.findOne({ id: user.id });
  }

  // 修改用户密码
  async updatePass(user: Partial<User>, info: UpdatePassDto) {
    if (!compareSync(info.password, user.password)) {
      throw new HttpException({ message: '用户密码不正确', code: 400 }, 200);
    }
    if (compareSync(info.newPassword, user.password)) {
      throw new HttpException(
        { message: '新密码与旧密码一致', code: 400 },
        200,
      );
    }

    await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ password: hashSync(info.newPassword, 10) })
      .where('user.id=:id', { id: user.id })
      .execute();
  }
}
