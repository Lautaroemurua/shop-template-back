// src/application/use-cases/process-message.use-case.ts
import { Injectable } from '@nestjs/common';
import { LlamaService } from '../../infrastructure/llama/llama.service';
import { WhatsAppService } from '../../infrastructure/whatsapp/whatsapp.service';
import { ConversationRepository } from '../repositories/conversation.repository';
import { UUID } from 'crypto';

@Injectable()
export class ProcessMessageUseCase {
  constructor(
    private readonly llamaService: LlamaService,
    private readonly whatsappService: WhatsAppService,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async process(message: string, role: string, tokens: number, user_id: UUID) {
    const llamaResponse = await this.llamaService.getLlamaResponse(message);
    const nlpResponse = await this.whatsappService.getNLPResponse(message);

    // Guardar la conversación en la base de datos
    const conversation = await this.conversationRepository.createConversation(user_id, message);

    return {
      llamaResponse,
      nlpResponse,
      conversation,
    };
  }
}
