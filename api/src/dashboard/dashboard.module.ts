import { Module } from '@nestjs/common';
import { RuralPropertyModule } from '@/rural-property/rural-property.module';
import { ProducerCropModule } from '@/producer-crop/producer-crop.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [RuralPropertyModule, ProducerCropModule],
  controllers: [DashboardController],
})
export class DashboardModule { }