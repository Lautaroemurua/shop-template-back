// src/infrastructure/database/conversation.repository.ts
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../../domain/entities/conversation.entity';
import { UUID } from 'crypto';

@Injectable()
export class ConversationRepository extends Repository<Conversation> {
  constructor(manager: EntityManager) {
    super(Conversation, manager);
  }

  async saveConversation(
    summary: string,
    user_id: UUID,
  ) {
    const conversation = this.create({ summary, user_id });
    return await this.save(conversation);
  }
}
