import { Injectable } from '@nestjs/common';
import { LlamaService } from '../../infrastructure/llama/llama.service';
import { WhatsAppService } from '../../infrastructure/whatsapp/whatsapp.service';
import { ConversationRepository } from 'src/infrastructure/repositories/conversation.repository'; // Asegúrate de la importación correcta
import { UUID } from 'crypto';

@Injectable()
export class ProcessMessageUseCase {
  constructor(
    private llamaService: LlamaService,
    private whatsappService: WhatsAppService,
    private conversationRepository: ConversationRepository,
  ) {}

  async process(message: string, role: string, tokens: number) {
    // Llamar a LLaMA para procesar el mensaje
    const llamaResponse = await this.llamaService.getLlamaResponse(message);

    // Llamar a NLPCloud para obtener una respuesta NLP
    const nlpResponse = await this.whatsappService.getNLPResponse(message);

    const user_id = '11e39612-f450-4e67-a8b2-99d7471ecf64';

    // Guardar la conversación en la base de datos
    const conversation = await this.conversationRepository.createConversation(message, user_id);

    return {
      llamaResponse,
      nlpResponse,
      conversation,
    };
  }

  async execute(summary: string, messageText: string, sender: string, user_id: UUID) {
    // Llamar a LLaMA para procesar el mensaje
    const llamaResponse = await this.llamaService.getLlamaResponse(summary);

    // Llamar a NLPCloud para obtener una respuesta NLP
    const nlpResponse = await this.whatsappService.getNLPResponse(summary);

    // Guardar la conversación en la base de datos
    const conversation = await this.conversationRepository.createConversation(summary, user_id);

    return {
      llamaResponse,
      nlpResponse,
      conversation,
    };
  }
}
