import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateNotificationBody } from 'src/validations/create-notification-body';
import { PrismaService } from '../services/prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return await this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    await this.prisma.notification.create({
      data: { id: randomUUID(), content, category, recipientId },
    });
  }
}
