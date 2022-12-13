import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @ApiPropertyOptional({ description: '用户昵称' })
  readonly nickname: string;

  @ApiPropertyOptional({ description: '用户手机号' })
  @IsNumber({}, { message: '手机号只能为数字' })
  readonly phone: number;

  @ApiProperty({ description: '用户角色' })
  readonly role: string;

  @ApiProperty({ description: '所属机构id' })
  readonly organizationId: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiPropertyOptional({ description: '用户头像' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: '用户邮箱' })
  readonly email: string;
}
