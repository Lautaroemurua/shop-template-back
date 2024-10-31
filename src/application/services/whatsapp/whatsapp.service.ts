import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEntity } from '../../../domain/entities/conversation.entity';
import { MessagesEntity } from '../../../domain/entities/messages.entity';

@Injectable()
export class WhatsappService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) {}

  async saveMessage(conversationId: string, message: string, role: string, tokens: number) {
    const newMessage = this.messageRepository.create({
      conversation_id: conversationId,
      message,
      role,
      tokens,
    });
    return this.messageRepository.save(newMessage);
  }

  async saveConversation(userId: string, summary: string) {
    const newConversation = this.conversationRepository.create({
      user_id: userId,
      summary,
    });
    return this.conversationRepository.save(newConversation);
  }
}
