import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { QueryRoleDto } from './dto/query-role.dto';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  @ApiOperation({ summary: '新增角色' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() post: RoleDto) {
    return await this.roleService.create(post);
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑角色' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() post: RoleDto) {
    return await this.roleService.edit(post);
  }

  @Post('getPage')
  @ApiOperation({ summary: '获取角色分页列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getPage(@Body() post: QueryRoleDto) {
    return await this.roleService.getPage(post);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除角色' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'id',
    required: true,
    description: '组织机构id',
  })
  async delete(@Query('id') id: string) {
    return await this.roleService.delete(id);
  }
}
