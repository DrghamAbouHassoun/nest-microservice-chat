"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const event_logger_service_1 = require("../event-logger/event-logger.service");
let OrderService = class OrderService {
    constructor(rabbitClient, eventLoggerService) {
        this.rabbitClient = rabbitClient;
        this.eventLoggerService = eventLoggerService;
    }
    async placeOrder(data) {
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
        ];
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("API_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        event_logger_service_1.EventLoggerService])
], OrderService);
//# sourceMappingURL=order.service.js.map