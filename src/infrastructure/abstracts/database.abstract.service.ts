import { Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/domain/enums/role.enum';
import { CustomerCategory } from '../../domain/enums/customer-category.enum';
import { ConversationInterface } from '../../domain/interfaces/conversation.interface';
import { MessageInterface } from '../../domain/interfaces/message.interface';
import { UserChannelInterface } from '../../domain/interfaces/user-channel.interface';

@Injectable()
export abstract class DatabaseAbstractService {
  abstract createUser(phoneNumber: string): Promise<UserChannelInterface>;
  abstract findUser(phoneNumber: string): Promise<UserChannelInterface | null>;
  abstract findOrCreateUser(phoneNumber: string): Promise<UserChannelInterface>;
  abstract updateUserCategory(userId: string, category: CustomerCategory): Promise<UserChannelInterface>;
  abstract createConversation(userId: string): Promise<ConversationInterface>;
  abstract findLastConversation(usuario_id: string): Promise<ConversationInterface | null>;
  abstract findLastSummary(userId: string): Promise<ConversationInterface | null>;
  abstract findConversationWithoutSummary(userId: string): Promise<ConversationInterface | null>;
  abstract findOrCreateConversation(userId: string): Promise<ConversationInterface>;
  abstract findConversationsWithoutSummary(): Promise<ConversationInterface[] | []>;
  abstract addMessageToConversation(conversationId: string, totalMessages: number, message: string, role: RoleEnum, tokens: number): Promise<MessageInterface>;
  abstract getConversationMessages(userId: string): Promise<MessageInterface[]>;
  abstract updateConversationSummary(conversationId: string, summary: string, suggestion: string, interests: string[], data: object): Promise<void>;
}
