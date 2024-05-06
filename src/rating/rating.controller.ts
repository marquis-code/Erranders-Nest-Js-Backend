// rating.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async rateService(@Body() ratingData: any) {
    return this.ratingService.rateService(ratingData);
  }

  // Other rating-related endpoints
}
