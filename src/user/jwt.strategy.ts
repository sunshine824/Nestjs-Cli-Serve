import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

// 环境配置信息
import envConfig from '../../config';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.SECRET,
    } as StrategyOptions);
  }

  async validate(user: User) {
    const existUser = await this.userService.getUser(user);
    return existUser;
  }
}
