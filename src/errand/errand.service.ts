// errand.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Errand } from './interfaces/errand.interface';

@Injectable()
export class ErrandService {
  constructor(@InjectModel('Errand') private readonly errandModel: Model<Errand>) {}

  async pickUpOrder(orderId: string, errandData: any) {
    // Update order status to indicate it has been picked up
    await this.orderModel.findByIdAndUpdate(orderId, { status: 'picked_up' });

    // Save errand details
    const createdErrand = new this.errandModel(errandData);
    return createdErrand.save();
  }

  // Other errand-related methods
}
