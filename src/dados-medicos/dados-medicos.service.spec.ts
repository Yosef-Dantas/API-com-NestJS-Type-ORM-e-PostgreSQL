import { Test, TestingModule } from '@nestjs/testing';
import { DadosMedicosService } from './dados-medicos.service';

describe('DadosMedicosService', () => {
  let service: DadosMedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosMedicosService],
    }).compile();

    service = module.get<DadosMedicosService>(DadosMedicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
