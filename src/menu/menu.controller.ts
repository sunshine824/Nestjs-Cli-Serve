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
import { MenuService } from './menu.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuDto } from './dto/menu.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  @ApiOperation({ summary: '新增菜单' })
  @ApiBearerAuth() // swagger文档设置token
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() post: MenuDto) {
    return await this.menuService.create(post);
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑菜单' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() post: MenuDto) {
    return await this.menuService.edit(post);
  }

  @Post('getTree')
  @ApiOperation({ summary: '获取菜单树' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'name',
    required: false,
    description: '菜单名称',
  })
  async getTree(@Query('name') name: string): Promise<MenuDto[]> {
    return await this.menuService.getTree(name);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除菜单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'id',
    required: true,
    description: '菜单id',
  })
  async delete(@Query('id') id: string) {
    return await this.menuService.delete(id);
  }
}
