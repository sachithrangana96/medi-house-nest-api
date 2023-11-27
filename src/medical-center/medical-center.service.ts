import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import { MedicalCenter,MedicalCenterSchema,MedicalCenterDocument } from '../schemas/medical-center.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class MedicalCenterService {

  constructor(@InjectModel(MedicalCenter.name) private medicalCenterModel: Model<MedicalCenterDocument>) {}

  async create(createMedicalCenterDto: CreateMedicalCenterDto) {
    return await new this.medicalCenterModel(createMedicalCenterDto).save();
  }

  findAll(name?: string): Promise<any[]> {
    console.log(name)
    const query = this.medicalCenterModel.find().populate('user');

  if (name) {
    query.find({ name });
  }

  return query.exec();
  }

  async findOne(id: string) {
    const medicalCenter = await this.medicalCenterModel.findById(id).populate('user').populate('doctors').populate('services').exec();
    if (!medicalCenter) {
      throw new NotFoundException('Medical center not found.');
    }

    return medicalCenter;
  }

  async update(id: string, updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return await this.medicalCenterModel.findByIdAndUpdate(id, updateMedicalCenterDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.medicalCenterModel.findByIdAndDelete(id);
  }
}
