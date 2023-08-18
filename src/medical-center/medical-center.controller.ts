import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalCenterService } from './medical-center.service';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';

@Controller('medical-center')
export class MedicalCenterController {
  constructor(private readonly medicalCenterService: MedicalCenterService) {}

  @Post()
  create(@Body() createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.medicalCenterService.create(createMedicalCenterDto);
  }

  @Get()
  findAll() {
    return this.medicalCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalCenterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return this.medicalCenterService.update(+id, updateMedicalCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalCenterService.remove(+id);
  }
}
