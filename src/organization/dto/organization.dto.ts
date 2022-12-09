// ApiProperty:必传参数  ApiPropertyOptional:可传参数
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty } from 'class-validator';

export class OrganizationDto {
  @ApiPropertyOptional({ description: '' })
  readonly id: string;

  @ApiProperty({ description: '组织机构名称' })
  @IsNotEmpty({ message: '组织机构名称必填' })
  readonly name: string;

  @ApiPropertyOptional({ description: '父级组织机构id' })
  readonly parentId: string;

  @ApiPropertyOptional({ description: '备注' })
  readonly remark: string;

  @ApiPropertyOptional({ description: '子机构' })
  readonly children: OrganizationDto[];
}
