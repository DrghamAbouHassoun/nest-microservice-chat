import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/modules/users/user.service";
export declare class WsGuard implements CanActivate {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    private readonly logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
