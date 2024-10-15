import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../../domain/entities/conversation.entity';

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}

  // Método para crear una conversación
  async createConversation(userId: string, summary: string): Promise<ConversationEntity> {
    const conversation = this.conversationRepository.create({ user_id: userId, summary });
    return this.conversationRepository.save(conversation);
  }

  // Método para buscar conversación por ID
  async findConversationById(user_id: string): Promise<ConversationEntity | null> {
    return this.conversationRepository.findOne({ where: { user_id } });
  }

  // Método para actualizar el resumen de la conversación
  async updateSummary(user_id: string, summary: string): Promise<ConversationEntity | null> {
    const conversation = await this.findConversationById(user_id);
    if (!conversation) return null;

    conversation.summary = summary;
    return this.conversationRepository.save(conversation);
  }
}
