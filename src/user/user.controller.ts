import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePassDto } from './dto/updatePass-user.dto';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  // formdata接收方式
  @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [User] })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('update')
  @ApiOperation({ summary: '修改用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req, @Body() data: UpdateUserDto) {
    const user = await this.userService.update(req.user, data);
    delete user.password;
    return user;
  }

  @Post('updatePass')
  @ApiOperation({ summary: '修改用户密码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updatePass(@Req() req, @Body() data: UpdatePassDto) {
    return this.userService.updatePass(req.user, data);
  }

  @Post('getUserInfo')
  @ApiOperation({ summary: '根据用户id获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'id',
    description: '用户id',
  })
  async getUserInfo(@Query('id') id: string) {
    const res = await this.userService.getUserInfo(id);
    delete res.password;
    return res;
  }
}
