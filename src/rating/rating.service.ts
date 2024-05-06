// rating.service.ts
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Rating } from "./schemas/rating.schema";

@Injectable()
export class RatingService {
  constructor(
    @InjectModel("Rating") private readonly ratingModel: Model<Rating>
  ) {}

  async rateService(ratingData: any) {
    const createdRating = new this.ratingModel(ratingData);
    return createdRating.save();
  }

  // Other rating-related methods
}
