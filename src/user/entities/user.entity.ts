import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { OrganizationEntity } from 'src/organization/entities/organization.entity';
const bcrypt = require('bcryptjs');

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100, default: '' })
  nickname: string; //昵称

  @Column('bigint')
  phone: number; // 手机号

  @Column() // 表示查询时隐藏此列
  @Exclude() // 返回数据时忽略password，配合ClassSerializerInterceptor使用
  password: string; // 密码

  @Column({ default: '' })
  avatar: string; //头像

  @Column({ default: '' })
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string; // 用户角色

  @OneToOne(type=>OrganizationEntity, organization=>organization.user)
  @JoinColumn()
  organization:OrganizationEntity

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

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
