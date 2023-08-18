import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MedicalCenterModule } from './medical-center/medical-center.module';
import { DoctorModule } from './doctor/doctor.module';
import { ServicesModule } from './services/services.module';
import { MedicatiosModule } from './medicatios/medicatios.module';
import { MedicationsModule } from './medications/medications.module';

@Module({
  imports: [UsersModule, PharmacyModule, MedicalCenterModule, DoctorModule, ServicesModule, MedicatiosModule, MedicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
