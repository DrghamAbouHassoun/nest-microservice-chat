"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const chat_service_1 = require("./chat.service");
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const ws_guard_1 = require("../../guards/ws.guard");
const user_module_1 = require("../users/user.module");
const chat_controller_1 = require("./chat.controller");
const mongoose_1 = require("@nestjs/mongoose");
const chat_schema_1 = require("../../schemas/chat.schema");
const message_schema_1 = require("../../schemas/message.schema");
const microservices_1 = require("@nestjs/microservices");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([{
                    name: "API_SERVICE",
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ["amqp://localhost:5672"],
                        queue: "email-queue",
                    }
                }]),
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                { name: chat_schema_1.Chat.name, schema: chat_schema_1.ChatSchema },
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema }
            ]),
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway, ws_guard_1.WsGuard],
        exports: [],
    })
], ChatModule);
;
//# sourceMappingURL=chat.module.js.map