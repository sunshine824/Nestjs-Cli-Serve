import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '用户昵称' })
  readonly nickname: string;

  @ApiPropertyOptional({ description: '用户头像' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: '用户邮箱' })
  readonly email: string;

  @ApiPropertyOptional({ description: '用户性别' })
  readonly sex: number;

  @ApiPropertyOptional({ description: '出生日期' })
  readonly birthday: Date;

  @ApiPropertyOptional({ description: '用户角色id', default: '' })
  readonly roleId: string;

  @ApiPropertyOptional({ description: '所属机构id', default: '' })
  readonly organizationId: string;
}
