// src/application/repositories/messages.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesEntity } from 'src/domain/entities/messages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageEntity: Repository<MessagesEntity>,
  ) {}

  async saveMessage(id: string, message: string, role: string, tokens: number): Promise<MessagesEntity> {
    const newMessage = this.messageEntity.create({ 
      id: id, 
      message, 
      role, 
      tokens 
    });
    return await this.messageEntity.save(newMessage);
  }
}
