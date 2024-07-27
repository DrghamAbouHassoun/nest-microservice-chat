import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLog, EventLogSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:admin@atlascluster.brfzfhn.mongodb.net/microservices?retryWrites=true&w=majority&appName=AtlasCluster"),
    MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
