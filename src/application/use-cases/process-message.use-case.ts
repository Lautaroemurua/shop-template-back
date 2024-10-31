// src/application/use-cases/process-message.use-case.ts
import { Injectable } from '@nestjs/common';
import { LlamaService } from '../../infrastructure/ia/llama/llama.service';
import { WhatsAppClient } from '../../infrastructure/chat/whatsapp/whatsapp.client';
import { ConversationRepository } from '../repositories/conversation.repository';
import { UUID } from 'crypto';

@Injectable()
export class ProcessMessageUseCase {
  constructor(
    private readonly llamaService: LlamaService,
    private readonly whatsAppClient: WhatsAppClient,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async process(message: string, role: string, tokens: number, user_id: UUID) {
    const llamaResponse = await this.llamaService.getLlamaResponse(message);
    // const nlpResponse = await this.whatsAppClient.getNLPResponse(message);

    // Guardar la conversación en la base de datos
    const conversation = await this.conversationRepository.createConversation(user_id, message);

    return {
      llamaResponse,
      // nlpResponse,
      conversation,
    };
  }
}
