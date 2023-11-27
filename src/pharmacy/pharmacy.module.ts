import { Module } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { PharmacyController } from './pharmacy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pharmacy, PharmacySchema } from 'src/schemas/pharmacy.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Pharmacy.name, schema: PharmacySchema }])
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
