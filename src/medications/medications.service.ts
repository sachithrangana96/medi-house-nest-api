import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy,PharmacyrDocument  } from '../schemas/pharmacy.schema';
import { Medication,MedicationDocument  } from '../schemas/medication.schema';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<PharmacyrDocument>,
   @InjectModel(Medication.name) private medicationModel: Model<MedicationDocument>,
    ) {}
 async create(createMedicationDto: CreateMedicationDto) {
    try {
      const newMedication = new this.medicationModel(createMedicationDto);
      const savedMedication = await newMedication.save();

      await this.pharmacyModel.findByIdAndUpdate(
        createMedicationDto?.pharmacy,
        { $push: { medications: savedMedication._id } },
        { new: true },
      )

      return savedMedication;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all medications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medication`;
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return `This action updates a #${id} medication`;
  }

  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
