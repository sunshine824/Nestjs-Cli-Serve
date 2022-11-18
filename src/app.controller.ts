import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('验证')
@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
