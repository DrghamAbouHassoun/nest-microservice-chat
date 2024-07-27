import { HttpException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(
    @Inject("EMAIL_SERVICE") private rabbitClient: ClientProxy,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { };

  public salt = bcrypt.genSaltSync();

  async login(data: LoginDto) {
    const user = await this.userService.findUserByEmail(data.email);
    if (!bcrypt.compare(data.password, user.password)) {
      throw new HttpException({
        success: false,
        messages: ["Wrong credentials"],
        status: 400,
        data: [],
      }, 200)
    }
    const payload = {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      image: user.image,
    };
    this.rabbitClient.emit("email-verified", { userEmail: user.email, userName: user.name })
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_AUTH_TOKEN, expiresIn: "1h" }),
    }
  }

  async register (data: RegisterDto) {
    const user = await this.userService.createUserAccount({
      email: data.email,
      name: data.name,
      password: await bcrypt.hash(data.password, this.salt),
      phone: data.phone,
    })

    const payload = user;
    const emailVerificationToken = this.generateEmailVerificationToken({ email: user.email });
    this.rabbitClient.emit("email-verified", { userEmail: user.email, userName: user.name, token: emailVerificationToken });

    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_AUTH_TOKEN, expiresIn: "1h" }),
    }
  }

  private generateEmailVerificationToken(data: { email: string }) {
    const token = this.jwtService.sign(data, { secret: process.env.JWT_VERIFIY_EMAIL_TOKEN, expiresIn: "60s" });
    return token;
  }
}