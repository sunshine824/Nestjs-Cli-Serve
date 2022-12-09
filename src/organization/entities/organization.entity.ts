import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, default: '' })
  name: string; // 组织机构名称

  @Column({ default: '' })
  parentId: string; // 父级组织id

  @Column({ default: '' })
  remark: string; //备注

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
