import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service,ServiceSchema,ServiceDocument } from '../schemas/services.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalCenter, MedicalCenterDocument } from 'src/schemas/medical-center.schema';


@Injectable()
export class ServicesService {
  
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(MedicalCenter.name) private medicalCenterModel: Model<MedicalCenterDocument>,
    ) {}
  
  async create(createServiceDto: CreateServiceDto):Promise<Service> {
    // return new this.serviceModel(createServiceDto).save(); 
    try {
      const newService = new this.serviceModel(createServiceDto);
      const savedService = await newService.save();

      await this.medicalCenterModel.findByIdAndUpdate(
        createServiceDto?.medicalCenter,
        { $push: { services: savedService._id } },
        { new: true },
      )

      return savedService;
    } catch (error) {
      throw error;
    }
  }
 
  findAll(name?: string): Promise<any[]> {
    const query = this.serviceModel.find();

    if (name) {
      query.find({ name });
    }
  
    return query.exec();
  }

  async findOne(id: string):Promise<any> {
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new NotFoundException('Pharamcy not found.');
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.serviceModel.findByIdAndDelete(id);
  }
}
