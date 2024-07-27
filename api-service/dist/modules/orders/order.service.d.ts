import { OrderDTO } from "./order.dto";
import { ClientProxy } from "@nestjs/microservices";
import { EventLoggerService } from "../event-logger/event-logger.service";
export declare class OrderService {
    private rabbitClient;
    private eventLoggerService;
    constructor(rabbitClient: ClientProxy, eventLoggerService: EventLoggerService);
    placeOrder(data: OrderDTO): Promise<{
        userName: string;
        productName: string;
        userEmail: string;
        status: string;
    }>;
    getAllOrders(): Promise<{
        id: number;
        userEmail: string;
        products: string[];
        date: string;
        status: string;
    }[]>;
}
