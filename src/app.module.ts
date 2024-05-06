import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./products/product.module";
import { OrderModule } from "./order/order.module";
import { CartModule } from "./cart/cart.module";
import { UserModule } from "./user/user.module";
import { ErrandModule } from "./errand/errand.module";
import { NotificationModule } from "./notification/notification.module";
import { PushNotificationModule } from './push-notification/push-notification.module';   
import { RatingModule } from "./rating/rating.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    CartModule,
    UserModule,
    NotificationModule,
    ErrandModule,
    PushNotificationModule,
    RatingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// @Module({
//   imports: [
//    MongooseModule.forRoot(process.env.MONGO_URI),
//     AuthenticationModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}
