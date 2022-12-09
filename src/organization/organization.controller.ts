import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationDto } from './dto/organization.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('组织机构')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('add')
  @ApiOperation({ summary: '新增组织机构' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() post: OrganizationDto) {
    return await this.organizationService.create(post);
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑组织机构' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async edit(@Body() post: OrganizationDto) {
    return await this.organizationService.edit(post);
  }

  @Post('getTree')
  @ApiOperation({ summary: '获取组织机构树' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'name',
    required: false,
    description: '组织机构名称',
  })
  async getTree(@Param('name') name: string): Promise<OrganizationDto[]> {
    return await this.organizationService.getTree(name);
  }
}
