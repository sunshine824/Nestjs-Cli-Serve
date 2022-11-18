import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

// 环境配置信息
import envConfig from '../../config';
import { LocalStorage } from './local.strategy';
import { JwtStorage } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  useFactory: () => {
    return {
      secret: envConfig.SECRET,
      signOptions: { expiresIn: '4h' },
    };
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [UserController],
  providers: [UserService, LocalStorage, JwtStorage],
})
export class UserModule {}
