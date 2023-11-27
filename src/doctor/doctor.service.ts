import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor,DoctorSchema,DoctorDocument } from '../schemas/doctor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalCenter, MedicalCenterDocument } from '../schemas/medical-center.schema';


@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
   @InjectModel(MedicalCenter.name) private medicalCenterModel: Model<MedicalCenterDocument>,
    ) {}
  
  async create(createDoctorDto: CreateDoctorDto) {

    try {
      const newDoctor = new this.doctorModel(createDoctorDto);
      const savedDoctor = await newDoctor.save();

      await this.medicalCenterModel.findByIdAndUpdate(
        createDoctorDto?.medicalCenter,
        { $push: { doctors: savedDoctor._id } },
        { new: true },
      )

      return savedDoctor;
    } catch (error) {
      throw error;
    }
  }

  findAll(name?: string,specialization?:string,experiance?:number): Promise<any[]> {
    const query = this.doctorModel.find();
    if (name) {
      query.find({ name });
    }
    if (specialization) {
      query.find({ specialization });
    }
  
    if (experiance && experiance > 0) {
      query.find({ experiance: { $gt: experiance } });
    }
    return query.exec();
  }

  async findOne(id: string):Promise<any> {
    const doctor = await this.doctorModel.findById(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found.');
    }
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.doctorModel.findByIdAndDelete(id);
  }
}
