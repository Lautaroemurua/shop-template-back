// src/application/use-cases/process-message.use-case.ts
import { Injectable } from '@nestjs/common';
import { LlamaService } from '../../infrastructure/ia/llama/llama.service';
import { WhatsAppClient } from '../../infrastructure/chat/whatsapp/whatsapp.client';
import { UUID } from 'crypto';
import { DatabaseImplementationService } from 'src/infrastructure/implementations/database.implementation.service';

@Injectable()
export class ProcessMessageUseCase {
  constructor(
    private readonly llamaService: LlamaService,
    private readonly whatsAppClient: WhatsAppClient,
    private readonly databaseService: DatabaseImplementationService,
  ) {}

  async process(message: string, role: string, tokens: number, user_id: UUID) {
    const llamaResponse = await this.llamaService.getLlamaResponse(message);
    // const nlpResponse = await this.whatsAppClient.getNLPResponse(message);

    // Guardar la conversación en la base de datos
    const conversation = await this.databaseService.createConversation(user_id.toString());

    return {
      llamaResponse,
      // nlpResponse,
      conversation,
    };
  }
}
