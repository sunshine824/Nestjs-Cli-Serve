import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
