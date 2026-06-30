import { Test, TestingModule } from '@nestjs/testing';
import { JogadoresCopaController } from './jogadores-copa.controller';
import { JogadoresCopaService } from './jogadores-copa.service';

describe('JogadoresCopaController', () => {
  let controller: JogadoresCopaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JogadoresCopaController],
      providers: [JogadoresCopaService],
    }).compile();

    controller = module.get<JogadoresCopaController>(JogadoresCopaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
