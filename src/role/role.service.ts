import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from 'src/menu/menu.service';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly RoleRepository: Repository<RoleEntity>,
    private readonly MenuService: MenuService,
  ) {}

  // 创建角色
  async create(post: Partial<RoleDto>): Promise<RoleEntity> {
    const { name, id, menuIdComma } = post;
    if (id) {
      throw new HttpException({ message: '新增不需要ID', code: 400 }, 200);
    }
    delete post.id;
    const isExist = await this.RoleRepository.findOne({ name });
    if (isExist) {
      throw new HttpException({ message: '角色名称已存在', code: 400 }, 200);
    }
    const menus = await this.MenuService.findByIds(
      menuIdComma?.split(',') || [],
    );
    const postParam: Partial<RoleEntity> = {
      ...post,
      menus: menus,
    };
    return await this.RoleRepository.save(postParam);
  }

  // 编辑角色
  async edit(post: Partial<RoleDto>): Promise<RoleEntity> {
    const { id, menuIdComma } = post;
    if (!id) {
      throw new HttpException({ message: '角色ID不能为空', code: 400 }, 200);
    }
    const existPost = await this.RoleRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(
        { message: `id为${id}的角色不存在`, code: 400 },
        200,
      );
    }
    const menus = await this.MenuService.findByIds(
      menuIdComma?.split(',') || [],
    );
    const postParam: Partial<RoleEntity> = {
      ...post,
      menus: menus,
    };
    const updatePost = this.RoleRepository.merge(existPost, postParam);
    return this.RoleRepository.save(updatePost);
  }

  // 查询角色列表(分页)
  async getPage(query) {}

  // 删除组织
  async delete(id: string) {
    const existPost = await this.RoleRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的角色不存在`, 400);
    }
    return await this.RoleRepository.remove(existPost);
  }

  // 通过组织id获取数据
  async getRoleInfo(id: string): Promise<RoleEntity> {
    return this.RoleRepository.findOne({ id });
  }
}
