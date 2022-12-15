import { Module } from '@nestjs/common';

import { AppController } from '../controllers/app.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
