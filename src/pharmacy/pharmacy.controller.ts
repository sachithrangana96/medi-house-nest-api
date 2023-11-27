import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Post()
  // @UseGuards(AuthGuard())
  create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmacyService.create(createPharmacyDto);
  }

  @Get()
  findAll( @Query('name') name: string = '' ) {
    return this.pharmacyService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Query('medication') medication = '' ) {
    return this.pharmacyService.findOne(id,medication);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePharmacyDto: UpdatePharmacyDto) {
    return this.pharmacyService.update(id, updatePharmacyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyService.remove(id);
  }
}
