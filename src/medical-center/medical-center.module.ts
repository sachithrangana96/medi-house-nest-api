import { Module } from '@nestjs/common';
import { MedicalCenterService } from './medical-center.service';
import { MedicalCenterController } from './medical-center.controller';

@Module({
  controllers: [MedicalCenterController],
  providers: [MedicalCenterService],
})
export class MedicalCenterModule {}
