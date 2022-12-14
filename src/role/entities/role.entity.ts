import { MenuEntity } from 'src/menu/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, default: '' })
  name: string; // 菜单名称

  @Column({ default: '' })
  remark: string; //备注

  // 关联用户表
  @OneToOne((type) => User, (user) => user.role)
  user: string;

  @ManyToMany((type) => MenuEntity, (menu) => menu.roles)
  @JoinTable({
    name: 'role_menu_relation',
    joinColumns: [{ name: 'roleId' }],
    inverseJoinColumns: [{ name: 'menuId' }],
  })
  menus: MenuEntity[];

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
}
