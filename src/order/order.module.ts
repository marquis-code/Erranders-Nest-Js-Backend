import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderSchema } from "./schemas/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { UserModule } from "src/user/user.module";
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
    UserModule,
    NotificationModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
