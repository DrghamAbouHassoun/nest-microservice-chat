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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const ws_guard_1 = require("../../guards/ws.guard");
const user_service_1 = require("../users/user.service");
const chat_service_1 = require("./chat.service");
const microservices_1 = require("@nestjs/microservices");
let ChatGateway = class ChatGateway {
    constructor(jwtService, userService, chateService, rabbitClient) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.chateService = chateService;
        this.rabbitClient = rabbitClient;
        this.connectedClients = [];
    }
    handleConnection(client) {
        const user = client["user"];
        if (user._id) {
            this.userService.changeUserStatus({ userId: user._id, status: true });
            this.connectedClients.push(user);
            console.log("User status updated: ", user._id);
        }
        console.log("Client connected", client.id);
        this.server.emit("clientConnected", user);
    }
    handleDisconnect(client) {
        const user = client["user"];
        if (user._id) {
            this.userService.changeUserStatus({ userId: user._id, status: false });
            this.connectedClients.filter(client => client._id !== user._id);
            console.log("User status updated: ", user._id);
        }
        console.log("Client has disconnected", user._id);
        this.server.emit("clientDisconnected", user);
    }
    afterInit(server) {
        server.use((client, next) => {
            try {
                const [type, token] = client.handshake.headers.authorization?.split(" ");
                if (!token || !type) {
                    next(new Error("Invalid token"));
                }
                const result = this.jwtService.verify(token, { secret: process.env.JWT_AUTH_TOKEN });
                if (!result) {
                    throw new Error("Invalid authentication token");
                }
                client["user"] = result;
                next();
            }
            catch (error) {
                next(error);
            }
        });
        common_1.Logger.log("Websocket initialized");
    }
    handlePrivateMessage(client, message) {
        console.log("New Private Message: ", message);
        console.log("User: ", client["user"]);
        client.emit("replyToPrivateMessage", message);
    }
    handleJoinRoom(client, { roomName }) {
        client.join(roomName);
        console.log(`${client["user"].name} has joined ${roomName}`);
        client.to(roomName).emit("userJoinedToRoom", `${client.id} has joined ${roomName}`);
    }
    handleLeaveRoom(client, { roomName }) {
        console.log(`${client["user"].name} has left ${roomName}`);
        client.leave(roomName);
    }
    async handleSendMessageToRoom(client, { roomName, content, to }) {
        const newMessage = await this.chateService.addMessage({
            chatId: roomName,
            content: content,
            from: client["user"]._id
        });
        if (!this.connectedClients.find(client => client._id === to)) {
            const otherUser = await this.userService.findUserById(to);
            this.rabbitClient.emit("new-message", { userName: otherUser.name, userEmail: otherUser.email, message: newMessage.content });
        }
        console.log("New Messages: ", newMessage);
        this.server.to(roomName).emit("messageToRoom", { newMessage, senderId: client["user"]._id });
    }
    handleGetCurrentRoom(client) {
        console.log("Current Room: ", " client: ", client.rooms);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleConnection", null);
__decorate([
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    (0, websockets_1.SubscribeMessage)("newPrivateMessage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handlePrivateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendMessageToRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessageToRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("currentRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleGetCurrentRoom", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5001, { cors: ["*"] }),
    __param(3, (0, common_1.Inject)("API_SERVICE")),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        chat_service_1.ChatService,
        microservices_1.ClientProxy])
], ChatGateway);
;
//# sourceMappingURL=chat.gateway.js.map