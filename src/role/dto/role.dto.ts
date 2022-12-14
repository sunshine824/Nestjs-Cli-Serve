// ApiProperty:必传参数  ApiPropertyOptional:可传参数
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @ApiPropertyOptional({ description: '' })
  id: string;

  @ApiPropertyOptional({ description: '角色名称' })
  readonly name: string;

  @ApiPropertyOptional({ description: '角色菜单idComma' })
  readonly menuIdComma: string;

  @ApiPropertyOptional({ description: '备注' })
  readonly remark: string;
}
