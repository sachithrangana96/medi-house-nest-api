import { Injectable } from '@nestjs/common';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';

@Injectable()
export class MedicalCenterService {
  create(createMedicalCenterDto: CreateMedicalCenterDto) {
    return 'This action adds a new medicalCenter';
  }

  findAll() {
    return `This action returns all medicalCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalCenter`;
  }

  update(id: number, updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return `This action updates a #${id} medicalCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalCenter`;
  }
}
