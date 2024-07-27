import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IEvent } from './types/event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("log-event")
  async handleLogEvent(@Payload() event: IEvent) {
    return await this.appService.handleLogEvent(event);
  }
}
