import { CustomerCategory } from "../../domain/enums/customer-category.enum"
import { Rol } from "../../domain/enums/rol.enum"
import { ConversationInterface } from "../../domain/interfaces/conversation.interface"
import { MessageInterface } from "../../domain/interfaces/message.interface"
import { UserChannelInterface } from "../../domain/interfaces/user-channel.interface"

export interface DatabaseSchema {
  createUser: (phoneNumber: string) => Promise<UserChannelInterface>;
  findUser: (phoneNumber: string) => Promise<UserChannelInterface | null>;
  findOrCreateUser: (phoneNumber: string) => Promise<UserChannelInterface>;
  updateUserCategory: (
    userId: string,
    category: keyof CustomerCategory
  ) => Promise<UserChannelInterface>;
  createConversation: (userId: string) => Promise<ConversationInterface>;
  findLastSummary: (userId: string) => Promise<ConversationInterface | null>;
  findConversationWithoutSummary: (
    userId: string
  ) => Promise<ConversationInterface | null>;
  findOrCreateConversation(userId: string): Promise<ConversationInterface>;
  findConversationsWithoutSummary(): Promise<ConversationInterface[] | []>;
  addMessageToConversation: (
    conversationId: string,
    message: string,
    role: keyof Rol
  ) => Promise<MessageInterface>;
  getConversationMessages(userId: string): Promise<MessageInterface[]>;
  updateConversationSummary(
    conversationId: string,
    summary: string,
    suggestion: string,
    interests: string[],
    data: object
  ): Promise<void>;
}
