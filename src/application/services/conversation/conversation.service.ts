import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { ConversationRepository } from 'src/application/repositories/conversation.repository';
import { MessagesRepository } from 'src/application/repositories/messages.repository';

@Injectable()
export class ConversationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly conversationRepository: ConversationRepository,
    private readonly messagesRepository: MessagesRepository,
  ) {}

  async startConversation(phone: string) {
      try {
          // Buscar el usuario por su número de teléfono
          let user = await this.userRepository.findByPhone(phone);
          // Si el usuario no existe, crearlo
          if (!user) {
            user = await this.userRepository.createUser(phone);
            console.log('User created:', user);
          }
          console.log('Usuer founded:', user);
  
          // Buscar una conversación abierta para el usuario (resumen null)
          let conversation = await this.conversationRepository.findOpenConversation(user.id);
  
          // Si no existe una conversación abierta, crearla
          if (!conversation) {
            conversation = await this.conversationRepository.createConversation(user.id, null);
            console.log('Conversation created:', conversation);
          }
          console.log('Conversation founded:', conversation);
          return conversation;
      } catch (error) {
          console.error('Error starting conversation:', error);
          throw new Error('Unable to start conversation.'); // Manejo de errores más claro
      }
  }

  async saveUserMessage(
    conversationId: string,
    message: string,
    tokens: number,
  ) {
    return await this.messagesRepository.saveMessage(
      conversationId,
      message,
      'user',
      tokens,
    );
  }

  async saveAssistantMessage(
    conversationId: string,
    message: string,
    tokens: number,
  ) {
    return await this.messagesRepository.saveMessage(
      conversationId,
      message,
      'assistant',
      tokens,
    );
  }
}
