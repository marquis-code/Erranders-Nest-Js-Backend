// errand.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ErrandService } from './errand.service';
import { OrderService } from '../order/order.service';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../order/email.service';
import { PushNotificationService } from '../order/push-notification.service';

@Controller('errands')
export class ErrandController {
  constructor(
    private readonly errandService: ErrandService,
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Post(':orderId')
  async pickUpOrder(@Param('orderId') orderId: string, @Body() errandData: any) {
    // Assume errandData contains errand details
    const pickedUpErrand = await this.errandService.pickUpOrder(orderId, errandData);

    // Notify the user who placed the order
    const order = await this.orderService.getOrderById(orderId);
    const user = order.user;
    const notificationData = {
      recipient: user,
      message: 'Your order has been picked up',
      type: 'email',
      // other notification details
    };
    await this.notificationService.sendNotification(notificationData);

    // Send push notification to the user who placed the order
    const pushNotificationData = {
      recipient: user.deviceToken,
      title: 'Order Picked Up',
      body: 'Your order has been picked up',
    };
    await this.pushNotificationService.sendPushNotification(pushNotificationData);

    return pickedUpErrand;
  }

  // Other errand-related endpoints
}
