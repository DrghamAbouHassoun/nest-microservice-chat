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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
let AuthService = class AuthService {
    constructor(rabbitClient, userService, jwtService) {
        this.rabbitClient = rabbitClient;
        this.userService = userService;
        this.jwtService = jwtService;
        this.salt = bcrypt.genSaltSync();
    }
    ;
    async login(data) {
        const user = await this.userService.findUserByEmail(data.email);
        if (!bcrypt.compare(data.password, user.password)) {
            throw new common_1.HttpException({
                success: false,
                messages: ["Wrong credentials"],
                status: 400,
                data: [],
            }, 200);
        }
        const payload = {
            _id: user._id,
            email: user.email,
            phone: user.phone,
            name: user.name,
            image: user.image,
        };
        this.rabbitClient.emit("email-verified", { userEmail: user.email, userName: user.name });
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_AUTH_TOKEN, expiresIn: "1h" }),
        };
    }
    async register(data) {
        const user = await this.userService.createUserAccount({
            email: data.email,
            name: data.name,
            password: await bcrypt.hash(data.password, this.salt),
            phone: data.phone,
        });
        const payload = user;
        const emailVerificationToken = this.generateEmailVerificationToken({ email: user.email });
        this.rabbitClient.emit("email-verified", { userEmail: user.email, userName: user.name, token: emailVerificationToken });
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_AUTH_TOKEN, expiresIn: "1h" }),
        };
    }
    generateEmailVerificationToken(data) {
        const token = this.jwtService.sign(data, { secret: process.env.JWT_VERIFIY_EMAIL_TOKEN, expiresIn: "60s" });
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("EMAIL_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map