import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(data: LoginDto): Promise<{
        success: boolean;
        messages: string[];
        data: {
            access_token: string;
        };
        status: number;
    }>;
    register(data: RegisterDto): Promise<{
        success: boolean;
        messages: string[];
        data: {
            access_token: string;
        };
        status: number;
    }>;
    getProfile(req: any): any;
}
