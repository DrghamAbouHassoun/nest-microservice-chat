import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([{
      name: "EMAIL_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: "email-queue",
      }
    }]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_AUTH_TOKEN,
      signOptions: { expiresIn: "1h" },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_VERIFIY_EMAIL_TOKEN
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule { }