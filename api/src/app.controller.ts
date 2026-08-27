import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { IsPublic } from '@/shared/decorators/is-public/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @IsPublic()
  getHealthcheck() {
    return this.appService.getHealthcheck();
  }
}
