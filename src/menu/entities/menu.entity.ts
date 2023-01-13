import { RoleEntity } from 'src/role/entities/role.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, default: '' })
  name: string; // 菜单名称

  @Column('simple-enum', { enum: ['catalog', 'menu', 'button'] })
  type: string; //菜单类型

  @Column()
  url: string; //菜单URL

  @Column({ default: '' })
  parentId: string; // 父级菜单id

  @Column({ default: '' })
  remark: string; //备注

  @Column({ default: 0 })
  order: number; // 排序号

  @ManyToMany((type) => RoleEntity, (role) => role.menus)
  roles: RoleEntity[];

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}
