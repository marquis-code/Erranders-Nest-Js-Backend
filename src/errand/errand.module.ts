// errand.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrandController } from './errand.controller';
import { ErrandService } from './errand.service';
import { ErrandSchema } from './schemas/errand.schema';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Errand', schema: ErrandSchema }]),
    OrderModule,
  ],
  controllers: [ErrandController],
  providers: [ErrandService],
})
export class ErrandModule {}
