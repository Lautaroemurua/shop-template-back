// src/application/services/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../../repositories/messages.repository';
import { ConversationRepository } from '../../repositories/conversation.repository';

@Injectable()
export class WhatsAppService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async saveMessage(conversationId: string, message: string, role: string, tokens: number) {
    return this.messagesRepository.saveMessage(conversationId, message, role, tokens);
  }

  async saveConversation(userId: string, summary: string) {
    // Llama a createConversation pasando los parámetros individuales
    return this.conversationRepository.createConversation(userId, summary);
  }
}
