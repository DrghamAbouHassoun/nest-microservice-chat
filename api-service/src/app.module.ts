import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/orders/order.module';
import { EventLoggerModule } from './modules/event-logger/event-logger.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { ChatGateway } from './modules/chat/chat.gateway';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://admin:admin@atlascluster.brfzfhn.mongodb.net/microservices?retryWrites=true&w=majority&appName=AtlasCluster"),
    OrderModule,
    EventLoggerModule,
    UserModule,
    AuthModule,
    // ChatGateway,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
