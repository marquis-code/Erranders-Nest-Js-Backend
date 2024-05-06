// push-notification.service.ts (continued)
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PushNotification } from './interfaces/push-notification.interface';

@Injectable()
export class PushNotificationService {
  constructor(@InjectModel('PushNotification') private readonly pushNotificationModel: Model<PushNotification>) {}

  async sendPushNotification(pushNotificationData: any) {
    const createdPushNotification = new this.pushNotificationModel(pushNotificationData);
    return createdPushNotification.save();
  }

  // Other push notification-related methods
}
