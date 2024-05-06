// email.service.ts (continued)
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Email } from './interfaces/email.interface';

@Injectable()
export class EmailService {
  constructor(@InjectModel('Email') private readonly emailModel: Model<Email>) {}

  async sendEmail(emailData: any) {
    const createdEmail = new this.emailModel(emailData);
    return createdEmail.save();
  }

  // Other email-related methods
}
