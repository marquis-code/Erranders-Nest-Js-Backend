// notification.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}

  async sendNotification(notificationData: any) {
    const createdNotification = new this.notificationModel(notificationData);
    return createdNotification.save();
  }

  // other notification-related methods
}