import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Pharmacy,PharmacySchema,PharmacyrDocument } from '../schemas/pharmacy.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PharmacyService {

  constructor(@InjectModel(Pharmacy.name) private pharmacyModel: Model<PharmacyrDocument>) {}

  async create(createPharmacyDto: CreatePharmacyDto):Promise<any> {
    return await new this.pharmacyModel(createPharmacyDto).save();
  }

   findAll(name?: string): Promise<any[]> {
    const query = this.pharmacyModel.find().populate('user');
    if (name) {
      query.find({ name });
    }

    return query.exec();
  }

  async findOne(id: string, medicationName: string): Promise<any> {
    let query = this.pharmacyModel.findById(id).populate('user');
  
    if (medicationName) {
      query = query.populate({
        path: 'medications',
        match: { name: medicationName },
      });
    } else {
      query = query.populate('medications');
    }
  
    const pharmacy = await query.exec();
  
    if (!pharmacy) {
      throw new NotFoundException('Pharmacy not found.');
    }
  
    return pharmacy;
  }
  

  async update(id: string, updatePharmacyDto: UpdatePharmacyDto) {
    return await this.pharmacyModel.findByIdAndUpdate(id, updatePharmacyDto, {
      new: true,
      runValidators: true,
    });
  }

 async remove(id: string) {
    return await this.pharmacyModel.findByIdAndDelete(id);
  }
}
