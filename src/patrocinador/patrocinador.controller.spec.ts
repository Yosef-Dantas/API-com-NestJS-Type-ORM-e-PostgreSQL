import { Test, TestingModule } from '@nestjs/testing';
import { PatrocinadorController } from './patrocinador.controller';
import { PatrocinadorService } from './patrocinador.service';

describe('PatrocinadorController', () => {
  let controller: PatrocinadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatrocinadorController],
      providers: [PatrocinadorService],
    }).compile();

    controller = module.get<PatrocinadorController>(PatrocinadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
