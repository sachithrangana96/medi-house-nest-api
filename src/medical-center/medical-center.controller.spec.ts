import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCenterController } from './medical-center.controller';
import { MedicalCenterService } from './medical-center.service';

describe('MedicalCenterController', () => {
  let controller: MedicalCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalCenterController],
      providers: [MedicalCenterService],
    }).compile();

    controller = module.get<MedicalCenterController>(MedicalCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
