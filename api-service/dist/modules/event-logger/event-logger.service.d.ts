import { ClientProxy } from "@nestjs/microservices";
import { IEvent } from "src/types/event";
export declare class EventLoggerService {
    private rabbitClient;
    constructor(rabbitClient: ClientProxy);
    handleLogEvent(event: IEvent): Promise<void>;
}
