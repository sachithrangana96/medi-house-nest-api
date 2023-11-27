import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medication, MedicationSchema } from '../schemas/medication.schema';
import { Pharmacy, PharmacySchema } from '../schemas/pharmacy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medication.name, schema: MedicationSchema },
      { name: Pharmacy.name, schema: PharmacySchema },
    ])
  ],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
 