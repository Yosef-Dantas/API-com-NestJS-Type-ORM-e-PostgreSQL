import { Test, TestingModule } from '@nestjs/testing';
import { PatrocinadorService } from './patrocinador.service';

describe('PatrocinadorService', () => {
  let service: PatrocinadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatrocinadorService],
    }).compile();

    service = module.get<PatrocinadorService>(PatrocinadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
