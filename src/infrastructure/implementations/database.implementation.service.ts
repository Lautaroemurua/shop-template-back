import { Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/domain/enums/role.enum';
import { CustomerCategory } from '../../domain/enums/customer-category.enum';
import { UserChannelInterface } from 'src/domain/interfaces/user-channel.interface';
import { DatabaseAbstractService } from '../abstracts/database.abstract.service';
import { ConversationInterface, MessageInterface } from 'src/domain/interfaces';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ConversationRepository } from 'src/application/repositories/conversation.repository';

@Injectable()
export class DatabaseImplementationService extends DatabaseAbstractService {
  createUser(phoneNumber: string): Promise<UserChannelInterface> {
    throw new Error('Method not implemented.');
  }
  findUser(phoneNumber: string): Promise<UserChannelInterface | null> {
    throw new Error('Method not implemented.');
  }
  findOrCreateUser(phoneNumber: string): Promise<UserChannelInterface> {
    throw new Error('Method not implemented.');
  }
  updateUserCategory(userId: string, category: CustomerCategory): Promise<UserChannelInterface> {
    throw new Error('Method not implemented.');
  }
  createConversation(userId: string): Promise<ConversationInterface> {
    throw new Error('Method not implemented.');
  }
  findLastConversation(usuario_id: string): Promise<ConversationInterface | null> {
    throw new Error('Method not implemented.');
  }
  findLastSummary(userId: string): Promise<ConversationInterface | null> {
    throw new Error('Method not implemented.');
  }
  findConversationWithoutSummary(userId: string): Promise<ConversationInterface | null> {
    throw new Error('Method not implemented.');
  }
  findConversationsWithoutSummary(): Promise<ConversationInterface[] | []> {
    throw new Error('Method not implemented.');
  }
  addMessageToConversation(conversationId: string, message: string, role: RoleEnum, tokens: number): Promise<MessageInterface> {
    throw new Error('Method not implemented.');
  }
  getConversationMessages(userId: string): Promise<MessageInterface[]> {
    throw new Error('Method not implemented.');
  }
  updateConversationSummary(conversationId: string, summary: string, suggestion: string, interests: string[], data: object): Promise<void> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly conversationRepository: ConversationRepository) {
    super();
  }

  async findOrCreateConversation(userId: string): Promise<ConversationInterface> {
    const existingConversation = await this.findLastConversation(userId);
    if (existingConversation) {
      return existingConversation; // Retornar la conversación existente
    }
    return await this.createConversation(userId); // Crear una nueva conversación si no existe
  }

  // Otros métodos...
}
