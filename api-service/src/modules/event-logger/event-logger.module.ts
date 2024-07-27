import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventLoggerService } from "./event-logger.service";

@Global()
@Module({
  imports: [
    ClientsModule.register([{
      name: "LOGGER_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: "logger-queue",
      }
    }]),
  ],
  controllers: [],
  providers: [EventLoggerService],
  exports: [EventLoggerService],
})
export class EventLoggerModule { };