import { ApiProperty } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty } from 'class-validator';

export class UpdatePassDto {
  @ApiProperty({ description: '旧密码' })
  @IsNotEmpty({ message: '旧密码不能为空' })
  readonly password: string;

  @ApiProperty({ description: '新密码' })
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string;
}
