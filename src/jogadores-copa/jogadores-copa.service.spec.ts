import { Test, TestingModule } from '@nestjs/testing';
import { JogadoresCopaService } from './jogadores-copa.service';

describe('JogadoresCopaService', () => {
  let service: JogadoresCopaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JogadoresCopaService],
    }).compile();

    service = module.get<JogadoresCopaService>(JogadoresCopaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
