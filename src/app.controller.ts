import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiBearerAuth()
@ApiTags('exam system')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({ summary: 'say hello' })
  @ApiResponse({ status: 200, description: 'hello world!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
