// src/application/repositories/messages.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesEntity } from '../../domain/entities/messages.entity';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
  ) {}

  async saveMessage(conversationId: string, message: string, role: string, tokens: number): Promise<MessagesEntity> {
    const newMessage = this.messagesRepository.create({ 
      conversation_id: conversationId, 
      message, 
      role, 
      tokens 
    });
    return await this.messagesRepository.save(newMessage);
  }
}
