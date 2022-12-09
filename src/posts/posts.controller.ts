import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostsRo, PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
 
@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({
    summary: '创建文章',
  })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  @ApiOperation({
    summary: '获取文章列表',
  })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({
    summary: '通过文章id获取文章信息',
  })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiOperation({
    summary: '更新文章',
  })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @ApiOperation({
    summary: '删除文章',
  })
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
