import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service,ServiceSchema } from 'src/schemas/services.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalCenter, MedicalCenterSchema } from 'src/schemas/medical-center.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: MedicalCenter.name, schema: MedicalCenterSchema },
    ])
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
