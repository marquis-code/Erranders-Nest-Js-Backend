import { Controller, Post, Body, Get, Put, Param } from "@nestjs/common";
import { OrderService } from "./order.service";
import { NotificationService } from "../notification/notification.service";
import { UserService } from "../user/user.service";

@Controller("orders")
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) {}

  @Post()
  async createOrder(
    @Body()
    orderData: {
      userId: string;
      products: string[];
      totalPrice: number;
      location: string;
    }
  ) {
    const { userId, products, totalPrice, location } = orderData;
    const order = await this.orderService.createOrder(
      userId,
      products,
      totalPrice
    );
    const erranders = await this.userService.getUsersByLocation(location);
    const notificationData = {
      recipients: erranders.map((errander) => errander._id),
      message: `New order at ${location}`,
      type: "push",
      // other notification details
    };
    await this.notificationService.sendNotification(notificationData);

    return order;
  }

  @Get(":userId")
  async getUserOrders(@Param("userId") userId: string) {
    return await this.orderService.getOrdersByUser(userId);
  }

  @Put(":orderId/status")
  async updateOrderStatus(
    @Param("orderId") orderId: string,
    @Body("status") status: string
  ) {
    return await this.orderService.updateOrderStatus(orderId, status);
  }

  @Post(':orderId/receive-and-rate')
  async receiveAndRateOrder(@Param('orderId') orderId: string, @Body() ratingData: any) {
    return this.orderService.receiveAndRateOrder(orderId, ratingData);
  }

  @Get(':orderId/ratings')
  async getOrderRatings(@Param('orderId') orderId: string) {
    return this.orderService.getOrderRatings(orderId);
  }
}
