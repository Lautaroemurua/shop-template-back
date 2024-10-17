import { EntityRepository, Repository } from 'typeorm';
import { MessagesEntity } from '../../domain/entities/messages.entity';

@EntityRepository(MessagesEntity)
export class MessagesRepository extends Repository<MessagesEntity> {
  async saveMessage(conversationId: string, message: string, role: string, tokens: number): Promise<MessagesEntity> {
    const newMessage = this.create({ 
      conversation: { id: conversationId },
      message, 
      role, 
      tokens 
    });
    return await this.save(newMessage);
  }
}
