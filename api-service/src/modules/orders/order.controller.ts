import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderDTO } from "./order.dto";
import { OrderService } from "./order.service";

@Controller("/orders")
export class OrderController {
    constructor(private orderService: OrderService) {};

    @Post("/")
    async placeOrder(@Body() order: OrderDTO) {
        const data = await this.orderService.placeOrder(order);
        return {
            success: true,
            messages: ["Created"],
            data,
            status: 201
        }
    }

    @Get("/")
    async getAllOrders() {
        return this.orderService.getAllOrders();
    }
}