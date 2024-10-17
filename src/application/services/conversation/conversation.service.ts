import { Injectable } from '@nestjs/common';
import { ConversationRepository } from 'src/infrastructure/repositories/conversation.repository';
import { MessagesRepository } from '../../../infrastructure/repositories/messages.repository';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messagesRepository: MessagesRepository,
  ) {}

  async startConversation(userId: string, summary: string) {
    const userId2 = '11e39612-f450-4e67-a8b2-99d7471ecf64'
    const conversation = this.conversationRepository.createConversation(userId2, summary);
    return conversation;
  }

  async saveUserMessage(conversationId: string, message: string, tokens: number) {
    return await this.messagesRepository.saveMessage(conversationId, message, 'user', tokens);
  }

  async saveAssistantMessage(conversationId: string, message: string, tokens: number) {
    return await this.messagesRepository.saveMessage(conversationId, message, 'assistant', tokens);
  }
}
