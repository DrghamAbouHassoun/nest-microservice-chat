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
var WsGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsGuard = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const user_service_1 = require("../modules/users/user.service");
let WsGuard = WsGuard_1 = class WsGuard {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(WsGuard_1.name);
    }
    async canActivate(context) {
        this.logger.log('WsGuard invoked here');
        const client = context.switchToWs().getClient();
        const bearerToken = client.headers?.handshack?.authorization || null;
        if (!bearerToken) {
            throw new websockets_1.WsException("No bearer token provided");
        }
        const [type, token] = bearerToken.split(" ");
        if (type !== "Bearer") {
            throw new websockets_1.WsException("Invalid bearer token format");
        }
        if (!token) {
            throw new websockets_1.WsException("No bearer token provided");
        }
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_AUTH_TOKEN });
            context.switchToWs().getData().user = payload;
        }
        catch (error) {
            throw new websockets_1.WsException("Something went wrong");
        }
        return true;
    }
};
exports.WsGuard = WsGuard;
exports.WsGuard = WsGuard = WsGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], WsGuard);
//# sourceMappingURL=ws.guard.js.map