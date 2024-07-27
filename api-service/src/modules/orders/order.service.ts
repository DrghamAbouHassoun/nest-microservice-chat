import { Inject, Injectable } from "@nestjs/common";
import { OrderDTO } from "./order.dto";
import { ClientProxy } from "@nestjs/microservices";
import { EventLoggerService } from "../event-logger/event-logger.service";

@Injectable()
export class OrderService {
  constructor(
    @Inject("API_SERVICE") private rabbitClient: ClientProxy,
    private eventLoggerService: EventLoggerService,
  ) { }

  async placeOrder(data: OrderDTO) {
    this.rabbitClient.emit("order-placed", data);
    return {
      userName: data.userName,
      productName: data.productName,
      userEmail: data.userEmail,
      status: "pending"
    };
  }

  async getAllOrders() {
    this.eventLoggerService.handleLogEvent({
      type: "fetch",
      title: "Fetch All Orders",
      description: "User a has fetched all orders",
      creationTime: new Date()
    });
    return [
      {
        "id": 12345,
        "userEmail": "user1@example.com",
        "products": ["Product A", "Product B"],
        "date": "2024-07-05",
        "status": "Pending"
      },
      {
        "id": 23456,
        "userEmail": "user2@example.com",
        "products": ["Product C", "Product D"],
        "date": "2024-07-05",
        "status": "Shipped"
      },
      {
        "id": 98765,
        "userEmail": "user10@example.com",
        "products": ["Product Q", "Product R", "Product S"],
        "date": "2024-07-05",
        "status": "Pending"
      }
    ]
  }
}