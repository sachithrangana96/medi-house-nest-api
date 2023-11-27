import { Module } from '@nestjs/common';
import { MedicalCenterService } from './medical-center.service';
import { MedicalCenterController } from './medical-center.controller';
import { MedicalCenter, MedicalCenterSchema } from 'src/schemas/medical-center.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';



@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: MedicalCenter.name, schema: MedicalCenterSchema }])
  ],
  controllers: [MedicalCenterController],
  providers: [MedicalCenterService],
})
export class MedicalCenterModule {}
 