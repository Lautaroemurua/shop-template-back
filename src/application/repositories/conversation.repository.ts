// src/application/repositories/conversation.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../../domain/entities/conversation.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}

  // Método para crear una nueva conversación
  async createConversation(user_id: string, summary: string | null): Promise<ConversationEntity> {
    const conversation = this.conversationRepository.create({ user_id: user_id, summary });
    return this.conversationRepository.save(conversation);
  }

  // Método para encontrar una conversación abierta (donde summary es null)
  async findOpenConversation(user_id: string): Promise<ConversationEntity | null> {
    return this.conversationRepository.findOne({
      where: {
        user_id: user_id,
        summary: null,
      },
    });
  }

  // Método para actualizar el resumen de una conversación existente
  async updateSummary(user_id: string, summary: string): Promise<ConversationEntity | null> {
    const conversation = await this.findOpenConversation(user_id); // Usamos `findOpenConversation`
    if (!conversation) return null;

    conversation.summary = summary;
    return this.conversationRepository.save(conversation);
  }

}
