import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MedicalCenterModule } from './medical-center/medical-center.module';
import { DoctorModule } from './doctor/doctor.module';
import { ServicesModule } from './services/services.module';
import { MedicationsModule } from './medications/medications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    PharmacyModule, 
    MedicalCenterModule, 
    DoctorModule, 
    ServicesModule,  
    MedicationsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/medi-house'),
    //AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
