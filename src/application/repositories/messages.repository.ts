import { EntityRepository, Repository } from 'typeorm';
import { Messages } from '../../domain/entities/messages.entity';

@EntityRepository(Messages)
export class MessagesRepository extends Repository<Messages> {
  async saveMessage(conversationId: string, message: string, role: string, tokens: number): Promise<Messages> {
    const newMessage = this.create({ 
      conversation_id: conversationId, 
      message, 
      role, 
      tokens 
    });
    return await this.save(newMessage);
  }
}
