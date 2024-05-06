// notification.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendNotification(@Body() notificationData: any) {
    return this.notificationService.sendNotification(notificationData);
  }
}