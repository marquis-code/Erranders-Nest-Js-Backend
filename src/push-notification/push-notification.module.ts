// push-notification.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PushNotificationController } from './push-notification.controller';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationSchema } from './schemas/push-notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PushNotification', schema: PushNotificationSchema }]),
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
})
export class PushNotificationModule {}
