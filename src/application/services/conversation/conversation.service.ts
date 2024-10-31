// src/application/services/conversation/conversation.service.ts
import { Injectable } from '@nestjs/common';
import { ConversationRepository } from 'src/application/repositories/conversation.repository';
import { MessagesRepository } from '../../repositories/messages.repository';
import { UserRepository } from '../../repositories/user.repository'; 

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messagesRepository: MessagesRepository,
    private readonly userRepository: UserRepository, // Agregado
  ) {}

  async startConversation(phone: string): Promise<any> {
    // Buscar el usuario por su número de teléfono
    let user = await this.userRepository.findByPhone(phone);
    
    // Si el usuario no existe, crearlo
    if (!user) {
      user = await this.userRepository.createUser(phone);
    }

    // Crear una conversación sin mensajes ni resumen
    const conversation = await this.conversationRepository.createConversation(user.id, '');
    return conversation;
  }

  async saveUserMessage(conversationId: string, message: string, tokens: number) {
    return await this.messagesRepository.saveMessage(conversationId, message, 'user', tokens);
  }

  async saveAssistantMessage(conversationId: string, message: string, tokens: number) {
    return await this.messagesRepository.saveMessage(conversationId, message, 'assistant', tokens);
  }
}
