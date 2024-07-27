import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { EventLoggerModule } from "../event-logger/event-logger.module";

@Module({
  imports: [
    ClientsModule.register([{
      name: "API_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: "email-queue",
      }
    }]),
    // EventLoggerModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule { };