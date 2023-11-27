import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor,DoctorSchema } from 'src/schemas/doctor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalCenter, MedicalCenterSchema } from 'src/schemas/medical-center.schema';


@Module({
  imports: [ MongooseModule.forFeature([
    { name: Doctor.name, schema: DoctorSchema },
    { name: MedicalCenter.name, schema: MedicalCenterSchema },
  ]),],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
 