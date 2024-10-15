import { EntityRepository, Repository } from 'typeorm';
import { Mesages } from '../../domain/entities/messages.entity';

@EntityRepository(Mesages)
export class MessagesRepository extends Repository<Mesages> {
  async saveMessage(conversationId: string, message: string, role: string, tokens: number): Promise<Mesages> {
    // const newMessage = this.create({ 
    //   conversation_id: conversationId, 
    //   message, 
    //   role, 
    //   tokens 
    // });
    // return await this.save(newMessage);
    return;
  }
}
