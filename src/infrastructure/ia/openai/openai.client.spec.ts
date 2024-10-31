import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiClient } from './openai.client';

describe('OpenaiService', () => {
  let service: OpenaiClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiClient],
    }).compile();

    service = module.get<OpenaiClient>(OpenaiClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
