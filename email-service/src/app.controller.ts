import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IncomingOrder } from './types/order';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("order-placed")
  handlerOrderPlaced (@Payload() order: IncomingOrder) {
    return this.appService.handleSendEmail(order); 
  }

  @EventPattern("email-verified")
  handleVerifiedEmail (@Payload() payload: { userName: string; userEmail: string, token: string }) {
    // console.log("Reched to controller", payload)
    return this.appService.handleSendVerifiedEmail(payload);
  }

  @EventPattern("new-message")
  handleNewMessage (@Payload() payload: { userName: string, userEmail: string, message: string }) {
    return this.appService.handleSendNewMessageEmail(payload);
  }
}
