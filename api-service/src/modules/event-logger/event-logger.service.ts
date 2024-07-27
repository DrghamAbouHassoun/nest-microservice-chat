import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IEvent } from "src/types/event";

@Injectable()
export class EventLoggerService {
    constructor(
        @Inject("LOGGER_SERVICE") private rabbitClient: ClientProxy
    ){};

    async handleLogEvent(event: IEvent) {
        this.rabbitClient.emit("log-event", event);
        console.log(`Event logged: ${event.title}`);
    }
}