import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listToTree } from 'src/utils/utils';
import { Like, Repository } from 'typeorm';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationEntity } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly OrganizationRepository: Repository<OrganizationEntity>,
  ) {}

  // 创建组织结构
  async create(post: Partial<OrganizationEntity>): Promise<OrganizationEntity> {
    const { name, id } = post;
    if (id) {
      throw new HttpException({ message: '新增不需要组织ID', code: 400 }, 200);
    }
    delete post.id;
    const isExist = await this.OrganizationRepository.findOne({ name });
    if (isExist) {
      throw new HttpException(
        { message: '组织机构名称已存在', code: 400 },
        200,
      );
    }
    return await this.OrganizationRepository.save(post);
  }

  // 编辑组织结构
  async edit(post: Partial<OrganizationEntity>): Promise<OrganizationEntity> {
    const { id } = post;
    if (!id) {
      throw new HttpException({ message: '组织ID不能为空', code: 400 }, 200);
    }
    const existPost = await this.OrganizationRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(
        { message: `id为${id}的组织机构不存在`, code: 400 },
        200,
      );
    }
    const updatePost = this.OrganizationRepository.merge(existPost, post);
    return this.OrganizationRepository.save(updatePost);
  }

  // 获取组织结构树
  async getTree(name: string): Promise<OrganizationDto[]> {
    const data = await this.OrganizationRepository.find({
      ...(name && { name: Like(`%${name}%`) }), // == where: `name like '%销售%'`
    });
    const treeData = listToTree<OrganizationDto>(data);
    return treeData;
  }

  // 通过组织id获取数据
  async getOrganizationInfo(id: string): Promise<OrganizationEntity> {
    return this.OrganizationRepository.findOne({ id });
  }

  // 删除组织
  async delete(id: string) {
    const posts = await this.OrganizationRepository.findByIds(
      id?.split(',') || [],
    );
    if (!posts || !posts.length) {
      throw new HttpException(`id为${id}的菜单不存在`, 400);
    }
    posts.map((item) => {
      this.OrganizationRepository.remove(item);
    });
    return '删除成功';
  }
}
