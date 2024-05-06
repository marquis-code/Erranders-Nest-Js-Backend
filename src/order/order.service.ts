// orders.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./schemas/order.schema";
import { RatingService } from "../rating/rating.service";
import { NotificationService } from "../notification/notification.service";
import { EmailService } from "../email/email.service";

import { PushNotificationService } from "src/push-notification/push-notification.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel("Order") private readonly orderModel: Model<Order>,
    private readonly ratingService: RatingService,
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async getOrderById(orderId: string) {
    return this.orderModel.findById(orderId);
  }


  async createOrder(
    userId: string,
    products: string[],
    totalPrice: number
  ): Promise<Order> {
    const order = new this.orderModel({
      userId,
      products,
      totalPrice,
      status: "Pending",
      createdAt: new Date(),
    });
    return await order.save();
  }

  async receiveAndRateOrder(orderId: string, ratingData: any) {
    // Update order status to indicate it has been received
    await this.orderModel.findByIdAndUpdate(orderId, { status: 'received' });

    // Rate the service
    await this.ratingService.rateService(ratingData);

    // Notify the user who placed the order
    const order = await this.getOrderById(orderId);
    const user = order.user;
    const notificationData = {
      recipient: user,
      message: 'Your order has been successfully received and rated.',
      type: 'email',
      // other notification details
    };
    await this.notificationService.sendNotification(notificationData);

    // Send push notification to the user who placed the order
    const pushNotificationData = {
      recipient: user.deviceToken,
      title: 'Order Received and Rated',
      body: 'Your order has been successfully received and rated.',
    };
    await this.pushNotificationService.sendPushNotification(pushNotificationData);

    // Send email notification to the user who placed the order
    const emailSubject = 'Order Received and Rated';
    const emailBody = 'Your order has been successfully received and rated.';
    await this.emailService.sendEmail(user.email, emailSubject, emailBody);
  }


  async getOrdersByUser(userId: string): Promise<Order[]> {
    return await this.orderModel.find({ userId }).exec();
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    order.status = status;
    return await order.save();
  }

  async getOrderRatings(orderId: string) {
    return this.ratingService.find({ orderId }).exec();
  }
}
