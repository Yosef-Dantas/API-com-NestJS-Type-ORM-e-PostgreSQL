import { Test, TestingModule } from '@nestjs/testing';
import { DadosMedicosController } from './dados-medicos.controller';
import { DadosMedicosService } from './dados-medicos.service';

describe('DadosMedicosController', () => {
  let controller: DadosMedicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosMedicosController],
      providers: [DadosMedicosService],
    }).compile();

    controller = module.get<DadosMedicosController>(DadosMedicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
