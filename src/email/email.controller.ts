// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() emailData: any) {
    return this.emailService.sendEmail(emailData);
  }

  // Other email-related endpoints
}
