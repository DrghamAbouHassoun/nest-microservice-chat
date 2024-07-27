import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventLog } from './schemas/event.schema';
import { Model } from 'mongoose';
import { IEvent } from './types/event';

@Injectable()
export class AppService {
  constructor(@InjectModel(EventLog.name) private eventLogModel: Model<EventLog>) {};

  async handleLogEvent (data: IEvent) {
    const log = await this.eventLogModel.create({
      type: data.type,
      title: data.title,
      description: data.description,
      creationTime: data.creationTime,
    })
    return log;
  }
}
