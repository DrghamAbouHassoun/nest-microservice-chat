import { UserService } from "../users/user.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
export declare class AuthService {
    private rabbitClient;
    private readonly userService;
    private jwtService;
    constructor(rabbitClient: ClientProxy, userService: UserService, jwtService: JwtService);
    salt: string;
    login(data: LoginDto): Promise<{
        access_token: string;
    }>;
    register(data: RegisterDto): Promise<{
        access_token: string;
    }>;
    private generateEmailVerificationToken;
}
