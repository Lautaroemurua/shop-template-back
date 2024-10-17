// src/application/services/messages/message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../../domain/entities/users.entity';
import { ConversationsEntity } from 'src/domain/entities/conversations.entity';
import { MessagesEntity } from 'src/domain/entities/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(ConversationsEntity)
    private conversationsRepository: Repository<ConversationsEntity>,
    @InjectRepository(MessagesEntity)
    private messagesRepository: Repository<MessagesEntity>,
  ) {}

  async handleIncomingMessage(phone: string, messageContent: string): Promise<void> {
    // Corrección: Asegurando que la consulta 'where' tenga la estructura adecuada
    let user = await this.usersRepository.findOne({ where: { phone: phone } });
    
    // Si el usuario no existe, lo creamos
    if (!user) {
      user = this.usersRepository.create({ phone });
      await this.usersRepository.save(user);
    }

    // Obtener las conversaciones del usuario
    const conversations = await this.conversationsRepository.find({
      where: { user: user }, // Corrección aquí para buscar por usuario, no por su ID
      relations: ['messages'], // Opcional: cargar los mensajes relacionados
    });
    let conversation: ConversationsEntity;

    // Obtener la conversación más reciente o crear una nueva
    if (conversations.length > 0) {
      conversation = conversations[conversations.length - 1];
    } else {
      conversation = this.conversationsRepository.create({ user, summary: null });
      await this.conversationsRepository.save(conversation);
    }

    // Guardar el mensaje
    const message = this.messagesRepository.create({
      conversation,
      message: messageContent,
      role: 'user', // o 'bot', dependiendo de tu lógica
      tokens: messageContent.length, // Ejemplo de conteo de tokens
    });
    await this.messagesRepository.save(message);
  }
}
