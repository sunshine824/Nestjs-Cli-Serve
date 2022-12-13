import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
