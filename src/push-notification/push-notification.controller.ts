// push-notification.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';

@Controller('push-notifications')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Post()
  async sendPushNotification(@Body() pushNotificationData: any) {
    return this.pushNotificationService.sendPushNotification(pushNotificationData);
  }

  // Other push notification-related endpoints
}
