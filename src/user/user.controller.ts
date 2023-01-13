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
import { QueryUserDto } from './dto/query-user.dto';

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
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
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
    required: false,
    description: '用户id',
  })
  async getUserInfo(@Req() req, @Query('id') id: string) {
    if (!id) id = req.user.id;
    const res = await this.userService.getUserInfo(id);
    delete res.password;
    return res;
  }

  @Post('getPage')
  @ApiOperation({ summary: '用户列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getPage(@Body() data: QueryUserDto) {
    return await this.userService.getPage(data);
  }

  @Post('logout')
  @ApiOperation({ summary: '注销登录' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req) {
    return this.userService.logout(req.user);
  }
}
