import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/common';

export class QueryUserDto extends PartialType(PaginationDto) {
  @ApiPropertyOptional({ description: '用户主键', default: '' })
  readonly id: string;

  @ApiPropertyOptional({ description: '用户名称', default: '' })
  readonly username: string;

  @ApiPropertyOptional({ description: '用户昵称', default: '' })
  readonly nickname: string;

  @ApiPropertyOptional({ description: '用户手机号', default: '' })
  readonly phone: number;

  @ApiPropertyOptional({ description: '用户角色id', default: '' })
  readonly roleId: string;

  @ApiPropertyOptional({ description: '所属机构id', default: '' })
  readonly organizationId: string;

  @ApiPropertyOptional({ description: '用户邮箱', default: '' })
  readonly email: string;

  @ApiPropertyOptional({ description: '性别', default: 0 })
  readonly sex: number;

  @ApiPropertyOptional({ description: '出生日期', default: '' })
  readonly birthday: string;

  @ApiPropertyOptional({ description: '用户头像', default: '' })
  readonly avatar: string;

}
