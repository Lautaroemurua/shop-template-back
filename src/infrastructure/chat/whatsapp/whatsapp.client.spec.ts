import { Test, TestingModule } from '@nestjs/testing';
import { WhatsAppClient } from './whatsapp.client';

describe('WhatsAppClient', () => {
  let service: WhatsAppClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsAppClient],
    }).compile();

    service = module.get<WhatsAppClient>(WhatsAppClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
