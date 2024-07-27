import { OrderDTO } from "./order.dto";
import { OrderService } from "./order.service";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    placeOrder(order: OrderDTO): Promise<{
        success: boolean;
        messages: string[];
        data: {
            userName: string;
            productName: string;
            userEmail: string;
            status: string;
        };
        status: number;
    }>;
    getAllOrders(): Promise<{
        id: number;
        userEmail: string;
        products: string[];
        date: string;
        status: string;
    }[]>;
}
