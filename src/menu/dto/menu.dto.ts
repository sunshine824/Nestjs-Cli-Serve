// ApiProperty:必传参数  ApiPropertyOptional:可传参数
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty } from 'class-validator';

export class MenuDto {
  @ApiPropertyOptional({ description: '' })
  readonly id: string;

  @ApiPropertyOptional({ description: '菜单名称' })
  readonly name: string;

  @ApiPropertyOptional({ description: '菜单类型' })
  readonly type: string;

  @ApiPropertyOptional({ description: '父级菜单id' })
  readonly parentId: string;

  @ApiPropertyOptional({ description: '菜单URL' })
  readonly url: string;

  @ApiPropertyOptional({ description: '排序号', default: 0 })
  readonly order: number;

  @ApiPropertyOptional({ description: '备注' })
  readonly remark: string;

  @ApiPropertyOptional({ description: '子菜单' })
  readonly children: MenuDto[];
}
