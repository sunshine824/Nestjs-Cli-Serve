import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listToTree } from 'src/utils/utils';
import { Like, Repository } from 'typeorm';
import { MenuDto } from './dto/menu.dto';
import { MenuEntity } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  // 创建组织结构
  async create(post: Partial<MenuEntity>): Promise<MenuEntity> {
    const { name, id } = post;
    if (id) {
      throw new HttpException({ message: '新增不需要菜单ID', code: 400 }, 200);
    }
    delete post.id;
    const isExist = await this.menuRepository.findOne({ name });
    if (isExist) {
      throw new HttpException({ message: '菜单名称已存在', code: 400 }, 200);
    }
    return await this.menuRepository.save(post);
  }

  // 编辑菜单
  async edit(post: Partial<MenuEntity>): Promise<MenuEntity> {
    const { id } = post;
    if (!id) {
      throw new HttpException({ message: '菜单ID不能为空', code: 400 }, 200);
    }
    const existPost = await this.menuRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(
        { message: `id为${id}的菜单不存在`, code: 400 },
        200,
      );
    }
    const updatePost = this.menuRepository.merge(existPost, post);
    return this.menuRepository.save(updatePost);
  }

  // 获取菜单结构树
  async getTree(name: string): Promise<MenuDto[]> {
    const data = await this.menuRepository.find({
      ...(name && { name: Like(`%${name}%`) }), // == where: `name like '%销售%'`
    });
    const treeData = listToTree<MenuDto>(data);
    return treeData;
  }

  // 通过菜单id获取数据
  async getOrganizationInfo(id: string): Promise<MenuEntity> {
    return this.menuRepository.findOne({ id });
  }

  // 删除菜单
  async delete(id: string) {
    const existPost = await this.menuRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的菜单不存在`, 400);
    }
    return await this.menuRepository.remove(existPost);
  }
}
