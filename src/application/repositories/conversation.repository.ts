// src/application/repositories/conversation.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../../domain/entities/conversation.entity';

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly repository: Repository<ConversationEntity>, // Nombramos el repositorio de manera más clara
  ) {}

  // Método para crear una nueva conversación
  async createConversation(userId: string, summary: string | null): Promise<ConversationEntity> {
    const conversation = this.repository.create({ user_id: userId, summary });
    return this.repository.save(conversation);
  }

  // Método para encontrar una conversación abierta (donde summary es null)
  async findOpenConversation(userId: string): Promise<ConversationEntity | null> {
    return this.repository.findOne({
      where: {
        user_id: userId,
        summary: null,
      },
    });
  }

  // Método para actualizar el resumen de una conversación existente
  async updateSummary(userId: string, summary: string): Promise<ConversationEntity | null> {
    const conversation = await this.findOpenConversation(userId); // Usamos `findOpenConversation`
    if (!conversation) return null;

    conversation.summary = summary;
    return this.repository.save(conversation);
  }
}
